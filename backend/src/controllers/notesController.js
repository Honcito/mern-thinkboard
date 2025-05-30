import Note from '../models/Note.js';

// Si tenemos un argumento que no se usa, podemos sustituirlo por _
// export async function getAllNotes(_, res)
export async function getAllNotes(req, res) {
  try {
    // Si queremos ordenarlas de más reciente a más antigua
    const notes = await Note.find().sort({createdAt: -1})
    //const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in getAllNotes controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  //res.status(200).send('You just fetch all the notes');
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);

  } catch (error) {
    console.log('Error in findNoteById controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error in createNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  //res.status(200).json({ message: 'Note created successfully' });
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );

    if (!updatedNote)
      return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log('Error in updateNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  //res.status(200).json({ message: 'Note updated successfully' });
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.log('Error in deleteNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  //res.status(200).json({ message: 'Note deleted successfully' });
}
