import express, { Request, Response, Router } from "express";
import config from "../../../../config";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";


const router: Router = express.Router();

router.get("/", (req, res) => {
  res.render(`${config.rootFolder}/src/views/home.ejs`);
})

router.get("/products", async(_req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const productData = await response.json();
  res.render(`${config.rootFolder}/src/views/products.ejs`, productData);
})

router.get("/products/:productId", async(_req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const productData = await response.json();
  console.log(productData);
  res.render(`${config.rootFolder}/src/views/detailsProduct.ejs`, productData);
})

router.get("/comprar", (req, res) => {
  res.render(`${config.rootFolder}/src/views/comprar.ejs`);
})

router.get("/vender", (req, res) => {
  res.render(`${config.rootFolder}/src/views/vender.ejs`);
})

router.get("/movies", (req, res) => {
  res.status(200).send(
    [{ ok: true }, { ok: true }, { ok: true }]
  );
});

router.get("/movies/:movie", (req, res) => {
  res.status(200).send(
    { ok: req.params.movie }
  );
});

router.post("/movie", (req, res) => {
  res.status(200).send(
    req.body
  );
});

router.put("/movie/:movie", (req, res) => {
  res.status(200).send(
    {body: req.body, id: req.params.movie}
  );
});


export default router;
