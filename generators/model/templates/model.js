import mongoose from 'mongoose';

const <%= name %>Schema = new mongoose.Schema({

});

export default mongoose.model('<%= name %>', <%= name %>Schema);
