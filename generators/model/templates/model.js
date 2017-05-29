import mongoose from 'mongoose';

let <%= name %>Schema = new mongoose.Schema({

});

export default mongoose.model('<%= name %>', <%= name %>Schema);
