const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "too short Brand name"],
      maxlength: [32, "too long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
brandSchema.post("init", function (doc) {
  setImageUrl(doc);
});

brandSchema.post("save", function (doc) {
  setImageUrl(doc);
});

const BrandModel = mongoose.model("brand", brandSchema);

module.exports = BrandModel;
