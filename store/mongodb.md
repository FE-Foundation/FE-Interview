在MongoDB中，文档是基本单元，有一个在其集合中唯一的键``_id``，集合相当于关系型数据库中的表。

在其Shell中，可以通过：
* ``show dbs``: 查看所有数据库
* ``use 数据库名``: 选择数据库
* ``show collections``：显示当前数据库中的集合

操作MongoDB，首先关心的是：创建，读取，更新，删除 (CRUD)。

**创建**
```javascript
> me = {name: 'OriginalSoul'}
> you = {name: 'wyd'}

> db.user.insert(me)
WriteResult({ "nInserted" : 1 })

> db.user.save(you)
WriteResult({ "nInserted" : 1 })
```

**读取**
查看集合中所有文档
```javascript
> db.user.find()
{ "_id" : ObjectId("55f66e9492275b55995c14b5"), "name" : "OriginalSoul" }
{ "_id" : ObjectId("55f6707792275b55995c14b6"), "name" : "wyd" }
```

查看一个文档
```javascript
> db.user.findOne()
{ "_id" : ObjectId("55f66e9492275b55995c14b5"), "name" : "OriginalSoul" }
```
也可以根据限定条件查询。

**更新**
第一个参数：限定条件；第二个参数：新的文档。
```javascript
> me.age = 24
24
> db.user.update({name:'OriginalSoul'}, me)
```

**删除**
```javascript
> db.user.remove({name: 'wyd'})
```

如果要清空的话，可以直接删除集合:
```javascript
> db.user.drop()
```

Mongoose
--

``Mongoose``是一个基于``Node.js``和``MongoDB``的高级``ODM``类库。``Object-Document Mapping``对象文档映射。

``mongoose``中主要是``Schema``和``Model`` 两个概念。
```javascript
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb');
```

定义``schema``:
```
var ObjectId = mongoose.Schema.Types.ObjectId,
      Mixed = mongoose.Schema.Types.Mixed;

var bookSchema = mongoose.Schema({
      name: {type: String, unique: true},
      created_at: Date,
      updated_at: {type: Date, default: Date.now},
      published: Boolean,
      price: Number,
      authorId: {type: ObjectId, required: true},
      keywords: {type: [ String ], default: []},
      image: Buffer,
      notes: Mixed
})
```

**钩子 Hooks**
```
bookSchema.pre('save', function (next) {
      // 准备保存
      return next();
});

bookSchema.pre('remove', function (next) {
      // 准备删除
      return next();
});
```

**定义模型**
```
// 第一个参数设定模型名称
var Book = mongoose.model('Book', bookSchema);
var book = new Book({...});
```

**实例方法**
```
bookSchema.methods.findSimilarKeywords = function (cb) {
      return this.model('Book').find({keywords: this.keywords}, cb);
};

book.findSimilarKeywords(function (err, books) {
      console.log(books);
});
```
**静态方法**
```
bookSchema.statics.findByAuthorId = function (id, cb) {
       return this.find({authorId: id}, cb);
});

Book.findByAuthorId(' ', function (err, books) {
      console.log(books);
});
```

**CRUD**
```
book.save(function (err) {
      console.log(err);
});

Book.create({...}, function (err, doc) {});

Book.find({}, function (err, docs) {});
Book.find({}).limit(10).sort({'_id': -1}).exec(function (err, docs) {}); // -1降序
Book.findOne({'_id': ' '}, function (err, doc) {});
Book.findById(id, function (err, doc) {});

Book.update({ query... }, { update... }, { multi: true }, function (err, numberAffected, raw) {
      if (err) return handleError(err);
      console.log('The number of updated documents was %d', numberAffected);
      console.log('The raw response from Mongo was ', raw);
});
Book.findOneAndUpdate([query], [update], [options], [callback(error, doc)]);

book.remove([callback(error, doc)]);
Book.remove(query, [callback(error)]);
```
