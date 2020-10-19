const express = require("express");
const router = express.Router();
const service = require("./user.service");

router.get("/", async function (req, res) {
  try {
    const data = await service.find(req.query);
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.post("/", async function (req, res) {
  try {
    const data = await service.create(req.body);
    console.log(data);
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const data = await service.findById(req.params.id);
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.get("/:id/posts", async function (req, res) {
  try {
    const data = await (await service.findById(req.params.id))
      .populate("posts")
      .execPopulate();
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.post("/:id/follow", async function (req, res) {
  const { id } = req.params;
  // console.log(id);
  try {
    const data = await service.updateFollow(id, req.body);
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.put("/:id", async function (req, res) {
  try {
    console.log(req.body);
    const data = await service.update(req.params.id, req.body);
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const data = await service.delete(req.params.id);
    res.status(200).send({
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

module.exports = router;
