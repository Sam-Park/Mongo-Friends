const router = require("express").Router();

const Friend = require("./friendModel");

router
  .route("/")
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        if (friends.length === 0) {
          res
            .status(404)
            .json({ error: "There are no friends in the database" });
            console.log(error.message)
          return;
        } else {
          res.status(200).json(friends);
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "There was an error retrieving any friends." });
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age, contactInfo, createdOn } = req.body;
    const newFriend = new Friend({ firstName, lastName, age, contactInfo, createdOn });
    newFriend
      .save()
      .then(savedFriend => {
        if (age < 1 || age > 120) {
          res
            .status(400)
            .json({ error: "Please input a valid age between 1 and 120" });
          return;
        }
        res.status(201).json(savedFriend);
      })
      .catch(error => {
        res.status(422).json({ error: error });
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    Friend.findById(id)
      .then(foundFriend => {
        res.status(200).json(foundFriend);
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id, { runValidators: true })
      .then(deleteFriend => {
        if (deleteFriend === null) {
          res.status(404).json({ error: "No friend by that ID" });
          return;
        }
        res.json({ success: "Friend removed", resource: deleteFriend });
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  })

  .put((req, res) => {
    const { id } = req.params;
    const update = ({ firstName, lastName, age, contactInfo, createdOn } = req.body);
    Friend.findByIdAndUpdate(id, update, { new: true, runValidators: true })
      .then(friendUpdated => {
        if (friendUpdated === null) {
          res.status(404).json({ error: "No friend with that ID" });
        } else if (age < 1 || age > 120) {
          res
            .status(400)
            .json({ error: "Please input a valid age between 1 and 120" });
          return;
        }
        res.json({ success: "Updated your friend", resource: friendUpdated });
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  });

module.exports = router;
