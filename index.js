const express = require ("express")
const mysql = require ("mysql2/promise")
const app = express()

app.use(express.json())


const db = mysql.createPool ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Game", 
})

app.get("/jogos", async (req,res) =>{
    const[resultado] =  await db.execute("SELECT * FROM  jogos")
    return res.json(resultado)

})
app.get("/jogos/:id", async (req, res) => {
    const id = req.params.id

    const [jogo] = await db.execute("SELECT * FROM jogos WHERE id_jogos = ?", [id])

    if (jogo.length === 0) {
        return res.status(404).json({ error: "Jogo não encontrado" })
    }

    return res.json(jogo[0])
})

app.post("/jogos", async (req,res)=> {
    const { nome,desenvolvedora,sinopse_jogos,id_genero } = req.body

    if(!nome || !desenvolvedora || !sinopse_jogos || !id_genero){
        return res.status(400).json ({error: "Nome,desenvolvedora  e sinopse são obrigatorios"})

    }
    if (nome.length < 3) {
        return res.status(400).json({error: "Nome precisa ter mais de 2 caracteres"})
    }

    const [resultado] = await db.execute(
        "INSERT INTO jogos (nome,desenvolvedora,sinopse_jogos,id_genero) VALUES (?,?,?,?)",[nome,desenvolvedora,sinopse_jogos,id_genero]
    )
    return res.status(201).json({id: resultado.insertId,nome,desenvolvedora,sinopse_jogos, id_genero})
})

app.put("/jogos/:id",async(req,res) => {
    const {nome,desenvolvedora,sinopse_jogos,id_genero} = req.body
 
    if(!nome || !desenvolvedora|| !sinopse_jogos || !id_genero){
       return res.status(400).json ({error: "nome,desenvolvedora,sinopse_jogos e id_genero são obrigatorios"})
    }
    const id = req.params.id

    const [resultado] = await db.execute(
        "UPDATE jogos SET nome = ?, desenvolvedora = ?, sinopse_jogos=?, id_genero=? WHERE id_jogos =?", [nome,desenvolvedora,sinopse_jogos,id_genero,id]
    )

    if(resultado.affectedRows === 0){
       return res.status(404).json({error: "Jogos não encontrado"})
    }
    

    return res.json({ id, nome, desenvolvedora, sinopse_jogos, id_genero })

 })



app.delete("/jogos/:id", async (req, res) => {
  const id = req.params.id
  const [resultado] = await db.execute("DELETE FROM jogos WHERE id_jogos =?", [id])

  if (resultado.affectedRows === 0) {
    return res.status(404).json({ error: "Jogo não encontrado" })
  }
  res.status(200).json({ mensagem: "Jogo deletado com sucesso!" })

})

app.get("/genero", async (req,res) =>{
    const[resultado] =  await db.execute("SELECT * FROM  genero")
    return res.json(resultado)

})

app.post("/genero", async (req,res)=> {
    const { nome,descricao } = req.body

    if(!nome || !descricao){
        return res.status(400).json ({error: "Nome e descricao são obrigatorios"})

    }
    if (nome.length < 3) {
        return res.status(400).json({error: "Nome precisa ter mais de 2 caracteres"})
    }

    const [resultado] = await db.execute(
        "INSERT INTO genero (nome,descricao) VALUES (?,?)",[nome,descricao]
    )
    return res.status(201).json({id: resultado.insertId,nome,descricao})
})




app.listen(3000,() => console.log("API no ar"))