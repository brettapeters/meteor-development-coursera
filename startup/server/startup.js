if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Images.find().count() == 0) {
      Images.insert(
        {
        img_src: "lake.jpg",
        img_alt: "Long Pond. Bar Harbor, ME",
        title: "Long Pond",
        caption: "Rock skipping at Long Pond on Mount Desert Island, Maine."
        }
      );
      Images.insert(
        {
        img_src: "carter_notch.jpg",
        img_alt: "Carter Notch",
        title: "Carter Notch",
        caption: "Overlooking Carter Notch Hut and Wildcat Mountain along the Appalachian Trail"
        }
      );
      Images.insert(
        {
        img_src: "elk_mountains.jpg",
        img_alt: "Elk mountains",
        title: "Elk Mountains",
        caption: "View from the Four Pass Loop Trail in the Elk Mountains near Aspen, CO."
        }
      );
      for (var i = 1; i < 23; i++) {
        Images.insert(
          {
            img_src: `img_${i}.jpg`,
            img_alt: "Image alt text",
            title: `Image ${i}`,
            caption: `Image ${i} caption.`
          }
        );
      }
    }
  });
}