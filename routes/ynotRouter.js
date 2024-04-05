// This is the router file for all the router CRUD operations
// For and routes that contain localhost:3000/ynot/ will hit this file
// Read through this file and attempt some of the TODOs for practice

import express from "express";
import {
    createYnot,
    findOneYnotByID,
    updateYnotObject,
    deleteYnot,
    listAllYnots
} from "../models/ynotModel.js"

const router = express.Router();

// Create route localhost:5000/ynot that creates a new ynot object
// ynotMessage required to be defined in the request body
router.post("/", async(req, res) => {
    // validate if a ynot message was sent
    if(!req.body || !req.body.ynotMessage) {
        res.status(400).send({ message: "no Ynot message recieved!" });
    } else {
        //setup the default new ynot object
        console.log("going to create a new ynot", req.body);
        let ynotObject = {
            ynotMessage: req.body.ynotMessage,
            upVotes: 0,
            downVotes: 0,
            ytf: "",
            createdDate: Date.now()
        };
        //attempt to write the new ynot object to the database
        try {
            const createdYnot = await createYnot(ynotObject);
            res.send(createdYnot);
        } catch (error) {
            res.status(403).send({ message: error.message });
        }
    }
});


// Read route localhost:5000/ynot/(the ynot object id) that fetches a specific ynot object
// the object ID required to be defined in the request parameters (i.e. in the URL itself)
router.get("/:id", async(req, res) => {
    // validate if a ynot id was sent
    if(!req.params || !req.params.id) {
        res.status(400).send({ message: "no Ynot ID recieved!" });
    } else {
        // Grab the ynot id out of the URL parameters
        console.log("going to get a specific ynot", req.params.id);
        const id = req.params.id;
        //attempt to fetch the ynot object to the database
        try {
            const getYnot = await findOneYnotByID(id);
            res.send(getYnot);
        } catch (error) {
            res.status(403).send({ message: error.message });
        }
    }
});

// Update route localhost:5000/ynot/(the ynot object id) that updates an existing ynot object
// the object ID required to be defined in the request parameters (i.e. in the URL itself)
// ynotMessage, upVote, downVote, and ytf optional to be defined in the request body, but at least one should be defined
//
// TODO: as an added challenge write validation so that each request can only add one upvote, or one down vote at a time, not both simultaneously
router.put("/:id", async(req, res) => {
    // validate if a ynot id was sent
    if(!req.params || !req.params.id) {
        res.status(400).send({ message: "no Ynot ID recieved!" });
    }
    // validate if a ynotMessage, upVote, downVote, or ytf was sent in the body
    else if(!req.body || (
        !req.body.ynotMessage &&
        !req.body.upVote &&
        !req.body.downVote &&
        !req.body.ytf
    )) {
        res.status(400).send({ message: "no valid changes recieved!" });
    } else {
        // Grab the ynot id out of the URL parameters
        console.log("going to update a specific ynot", req.params.id);
        const id = req.params.id;
        //attempt to update the ynot object to the database
        try {
            // Fetch the current Ynot in order to handle updating upvotes
            //   The user request basically says "yes" I'd like to upvote/downvote
            //   This is done by setting upVote or downVote to true in the request body
            //   the math to update the total count is done below
            const getYnot = await findOneYnotByID(id);
            const body = req.body;
            // Construct the updated object
            const updatedYnotData = {
                ynotMessage: (body.ynotMessage) ? body.ynotMessage : undefined,
                upVotes: (body.upVote) ? getYnot.upVotes + 1 : getYnot.upVotes,
                downVotes: (body.downVote) ? getYnot.downVotes + 1 : getYnot.downVotes,
                ytf: (body.ytf) ? body.ytf : undefined
            }
            console.log("updatedYnotData: ", updatedYnotData)
            // Send the updated object to be updated
            const updateYnot = await updateYnotObject(id, updatedYnotData);
            res.send(updateYnot);
        } catch (error) {
            console.log("error: ", error)
            res.status(403).send({ message: error.message });
        }
    }
});

// Delete route localhost:5000/ynot/(the ynot object id) that updates an existing ynot object
// the object ID required to be defined in the request parameters (i.e. in the URL itself)
router.delete("/:id", async(req, res) => {
    // validate if a ynot id was sent
    if(!req.params || !req.params.id) {
        res.status(400).send({ message: "no Ynot ID recieved!" });
    } else {
        // Grab the ynot id out of the URL parameters
        console.log("going to delete a specific ynot", req.params.id);
        const id = req.params.id;
        // Attempt to delete the specific ynot object from the database
        try {
            const deletedYnot = await deleteYnot(id);
            res.send(deletedYnot);
        } catch (error) {
            res.status(403).send({ message: error.message });
        }
    }
});

// BONUS: List route localhost:5000/ynot that gets all ynot objects
// no mandatory parameters required
//
// TODO: use the created date value to filter out ynot object create after/before a certain date
// TODO: try to limit the number of ynots being returned to match a pagination limit
router.get("/", async(req, res) => {
    // Attempt to fetch all ynot objects from the database
    console.log("going to fetch all ynots");
    try {
        const allYnots = await listAllYnots();
        res.send(allYnots);
    } catch (error) {
        res.status(403).send({ message: error.message });
    }
})

export default router;


// Still looking for more? Here are a few ideas to try out:
// Validation:
//   - abstract out the validation steps in each route to reduce repeated code (DRY principle)
//   - add validation for data types (i.e. strings only for the ynot messages)
// 
// New Routes:
//   - add a new route from scratch (bulk delete, bulk update) see: https://mongoosejs.com/docs/queries.html for hints
//
// Error Handling:
//   - Abstract out error handling
//   - Include additional failure modes with handy error messages. see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses for hints