const trackeritem = require('../model/trackeritem');

exports.postitem = async (req, res) => {
  const { item, date } = req.body;
  console.log(item, date);
  const trackitem = new trackeritem({ task: item, date });
  await trackitem.save();
  console.log("item pre saved");
  res.status(200).json(trackitem);
  console.log('item post saved');
};

exports.getitem = async (req, res) => {
  try {
    const todo_item = await trackeritem.find({});
    console.log(todo_item);
    res.status(200).json(todo_item);
  } catch (error) {
    console.error('Error fetching tracker items:', error);
    res.status(500).json({ message: 'Server error while fetching tracker items' });
  }
};

exports.deleteitem = async (req, res) => {
  const { task, deadline  } = req.body;
  console.log(task, deadline);
  await trackeritem.findOneAndDelete({ task: task, date: deadline })  
  console.log("item deleted");
  res.status(200).json({message: "item deleted"});
};