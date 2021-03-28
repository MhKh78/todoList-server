const catchAsync = require("../utils/catchAsync");
const { User } = require("../models/UserModel");
const { Todo } = require("../models/TodoModel");
const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} = require("./handleFactory");
const AppError = require("../utils/appError");

exports.getAllMyTodos = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  return res.status(200).json({
    status: "success",
    todos: user.todoList,
  });
});

exports.getTodo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  const todo = user.todoList.find(
    (e) => String(e._id) === String(req.params.id)
  );

  if (!todo) {
    return next(new AppError("todo not found", 404));
  }

  return res.status(200).json({
    status: "success",
    todo,
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return next(new AppError("Input Incomplete", 402));
  }

  const todo = await Todo.create({ name, description });

  const user = await User.findById(req.user.id);
  user.todoList.push(todo._id);
  await user.save();

  return res.status(201).json({
    status: "success",
    data: todo
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const todo = user.todoList.find(
    (e) => String(e._id) === String(req.params.id)
  );

  if (!todo) {
    return next(new AppError("todo not found", 404));
  }

  await Todo.findByIdAndDelete(todo._id);
  user.todoList = user.todoList.filter(
    (e) => String(e._id) !== String(todo._id)
  );
  await user.save();

  return res.status(201).json({});
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const todo = user.todoList.find(
    (e) => String(e._id) === String(req.params.id)
  );

  if (!todo) {
    return next(new AppError("todo not found", 404));
  }

  await Todo.findByIdAndUpdate(todo._id, req.body);

  return res.status(201).json({
    status: "success",
  });
});
