import express from "express";
import { AlunoController } from "./src/Controllers/AlunoController.js";
import { QuestaoController } from "./src/Controllers/QuestaoController.js";
import { RespostaController } from "./src/Controllers/RespostaController.js";
import { SalaController } from "./src/Controllers/SalaController.js";

const routes = express.Router();

routes.get("/", (req, res) => {
    return res.status(200).send('Hey punk');
});

routes.get("/sala/", SalaController.listAll);
routes.post("/sala/novo", SalaController.store);
routes.put("/sala/alterar/:id", SalaController.update);
routes.delete("/sala/excluir/:id", SalaController.delete);

routes.get("/questao/:sala_id", QuestaoController.listAll);
routes.post("/questao/novo", QuestaoController.store);
routes.put("/questao/alterar/:id", QuestaoController.update);
routes.delete("/questao/excluir/:id", QuestaoController.delete);

routes.get("/aluno/", AlunoController.listAll);
routes.post("/aluno/novo", AlunoController.store);

routes.get("/resposta/questao/:id_questao", RespostaController.listAllByQuest);
routes.get("/resposta/aluno/:id_aluno", RespostaController.listAllByStudent);
routes.post("/resposta/novo", RespostaController.store);

export { routes }