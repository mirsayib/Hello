const mongoose = require('mongoose')


let n = [{
    id: 1,
    content: "HTML is easy",
    important: true
}, {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
}, {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
}]

if(process.argv.length < 3){
    console.log('give password as arguement');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mirsayib3:${password}@cluster0.bv0rscq.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


n.forEach((nt) => {
    const note = new Note({
    content: nt.content,
    important: nt.important,
    })  

    note.save().then(result => {
        console.log('note saved!');
        if (nt.id === 3) mongoose.connection.close()

    })
})






