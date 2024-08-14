var express = require('express');
var router = express.Router();
const Book = require('../models/book');

router.get('/',async (req,res) => {
    const data = await Book.find({title:{$regex:'JURAMENTADA',$options:'i'}});
    res.status(200).json(data);
})

router.get('/withCategories',async (req,res) => {
    // ref type ilişkilerde $lookup yerine kullanılan çözüm
    const data = await Book.find({title:{$regex:'JURAMENTADA',$options:'i'}})
    .populate('category_ids');
    res.status(200).json(data);
})


router.get('/aggregates',async (req,res) => {
    // ref type ilişkilerde $lookup yerine kullanılan çözüm
    const pipeline = [
        {
            $lookup: {
                from: 'categories', // Kaynak koleksiyon
                localField: 'category_ids', // books koleksiyonundaki referans alanı
                foreignField: '_id', // categories koleksiyonundaki ilişkilendirme alanı
                as: 'categories', // Birleştirilmiş sonuçların saklanacağı alan adı
            },
        },
        {
            $project: {
                title: 1, // Kitap başlığı gibi diğer bilgileri de göstermek isterseniz ekleyebilirsiniz
                category_names: {
                    $map: {
                        input: '$categories', // Kategori bilgileri dizisi
                        as: 'category', // Her bir kategori bilgisi için takma ad
                        in: '$$category.name', // Yalnızca 'name' alanını seç
                    },
                },
            },
        },
    ];
    const data = await Book.aggregate(pipeline);
    res.status(200).json(data);
})


router.post('/', async (req,res) => {
    console.log('body', req.body);
     const book = new Book(req.body);
     await book.save();
     res.status(201).json(book);
    // await Book.create(req.body);
});

router.get('/:id',async (req,res) => {
    const data = await Book.findById(req.params.id)
    res.status(200).json(data);
})


// api/books/1 PUT
router.put('/:id',async (req,res) => {

    console.log('PUT')
    
    try {
        
        const book = await Book.findByIdAndUpdate(req.params.id,req.body);
        if(!book){
            res.status(404).json({message:"Book Not Found!"});
        }
        else {
            res.status(204).json();
        }

    } catch (error) {
        console.log('error', error);
    }

   
});

router.delete('/:id', async (req,res) => {
    console.log('delete', req.params.id);
    // hem bulur hemde siler tek kayıt silmek için findByIdAndDelete kullanırız
    const book  = await Book.findByIdAndDelete(req.params.id);
    console.log('book', book);
    
    if(!book){
        res.status(404).json({message:"Book Not Found"});
    } else {
        res.status(204).json();
    }
})

module.exports = router;