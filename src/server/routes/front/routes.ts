import express, { Request, Response, Router } from "express";
import config from "../../../../config";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";
import { GetProducts, GetProduct} from "../../../interfaces/product.interface";
import { GetUsers, GetUser} from "../../../interfaces/user.interface";
import { GetHome} from "../../../interfaces/home.interface";
import { AuthService } from "../../../services/auth.service";

const router: Router = express.Router();

router.get("/", async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const response = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json"},
});
  const homeData = await response.json();
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(homeData));
 
  res.render(`${config.rootFolder}/src/views/home.ejs`, formattedResponse);
})

router.get("/products", async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json"},
});
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  

  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const productData = await response.json();
  const formattedResponse: GetProducts = JSON.parse(JSON.stringify(productData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.render(`${config.rootFolder}/src/views/products.ejs`, formattedResponse);
})

router.get("/products/:productId", async(_req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const productData = await response.json();
  const formattedResponse: GetProduct = JSON.parse(JSON.stringify(productData));

  res.render(`${config.rootFolder}/src/views/detailsProduct.ejs`, formattedResponse);
})

router.get("/comprar", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const response = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json"},
});
  const homeData = await response.json();
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(homeData));
  res.render(`${config.rootFolder}/src/views/comprar.ejs`, formattedResponse);
})

router.get("/vender", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const response = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json"},
});
  const homeData = await response.json();
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(homeData));
  res.render(`${config.rootFolder}/src/views/vender.ejs`, formattedResponse);
})

router.get("/register", async(req: Request, res: Response) => {
  const response = {
    logged : false,
    userId : false,
    rol : null,
  }
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(response));
  res.render(`${config.rootFolder}/src/views/register.ejs`, formattedResponse);
})

router.post("/register", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting}/user`, {
    method:"post",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  const statusData = await response.json();
  console.log(statusData);
  res.send(statusData);
})


router.get("/login", async(req : Request, res : Response) => {
  const response = {
    logged : false,
    userId : false,
    rol : null,
  }
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(response));
  res.render(`${config.rootFolder}/src/views/login.ejs`, formattedResponse);
})

router.post("/login", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + req.url}`, {
    method:"post",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  const homeData = await response.json();
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(homeData));
  if(formattedResponse.logged)
  {
    AuthService.generateSession(req);
  }
  res.send(formattedResponse);
})

router.get("/logout", async(_req: Request, res: Response) => {
  await fetch(`http://localhost:${Ports.Enrouting + _req.url}/${_req.session.email}`, {
      method:"delete",
  });
  if (_req.session) {
    _req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  res.redirect("/");
})

router.get("/users", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  

  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const userData = await response.json();
  const formattedResponse: GetUsers = JSON.parse(JSON.stringify(userData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.render(`${config.rootFolder}/src/views/users.ejs`, formattedResponse);
})

router.get("/users/:userId/update", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  

  const response = await fetch(`http://localhost:${Ports.Enrouting}/users/${_req.params.userId}`);
  const userData = await response.json();
  const formattedResponse: GetUser = JSON.parse(JSON.stringify(userData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.render(`${config.rootFolder}/src/views/updateUser.ejs`, formattedResponse);
})

router.put("/users/user/update", AuthService.authUser, async(_req: Request, res: Response) => {
  console.log(_req.body);
  const response = await fetch(`http://localhost:${Ports.Enrouting}/user/update`, {
    method:"put",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json"},
  });
  res.send(await response.json());
})


router.delete("/rol/user/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + req.url}`, {
    method:"delete",
  });
  res.send(await response.json());
});


export default router;
