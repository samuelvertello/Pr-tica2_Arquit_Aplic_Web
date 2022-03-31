var express = require('express');
const res = require('express/lib/response')
var router = express.Router();
const fs = require('fs');


/* GET home page. */
router.get('/', async(req, res, next) => {
  try {
    const lists = await global.db.findAll();
    res.render('index', {title: 'Filmes', lists});
  } catch (error) {

      next(error);
    
  }
  
})

router.get('/view/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const list = await global.db.findOne(id);
    res.render('view', {title: 'Informações', list, action: "/view/" + list._id});
    
  } catch (error) {
      next(error);
    
  }
})



router.get('/new', (req, res, next) => {  

  res.render('new',
         {title: 'Novo Filme', 
            list: {"titulo":"", "sinopse":"", "duracao":"", "dataLancamento":"", "imagem":"", "categorias":""},
            action: "/new"});
})


router.post('/new', async(req, res, next) =>{ 
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = parseInt(req.body.duracao);
  const dataLancamento =req.body.dataLancamento;
  var imagem = req.body.imagem;
  var categorias = new Array(req.body.categorias);

  try {
    const result = await global.db.insert({titulo, sinopse, duracao, dataLancamento, imagem, categorias});
    console.log(result);
    res.redirect('/');
  }catch(err) {
    next(err);
  }
})

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const list = await global.db.findOne(id);
    res.render('edit', {title: 'Editar Filme', list, action: "/edit/" + list._id});
    
  } catch (error) {
      next(error);
    
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = req.body.duracao;
  const dataLancamento = req.body.dataLancamento;
  var imagem = req.body.imagem;
  const categorias = new Array(req.body.categorias); 

  try {
    const result = await global.db.update(id, {titulo, sinopse, duracao, dataLancamento, imagem, categorias});
    console.log(result);
    res.redirect('/');
        
  } catch (error) {
    next(error);
    
  }
})

router.get('/delete/:id', async(req, res) => {
  const id = req.params.id;

  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
    
  } catch (error) {
      next(error);
    
  }
})

module.exports = router;
