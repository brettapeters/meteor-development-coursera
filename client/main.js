if (Meteor.isClient) {
  Session.set("imageLimit", 8);
  
  lastScrollTop = 0;
  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      let scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop) {
        Session.set("imageLimit", Session.get("imageLimit") + 4);
      }
      lastScrollTop = scrollTop;
    }
  });
  
  Accounts.ui.config({passwordSignupFields: "USERNAME_AND_EMAIL"});
  
  Template.images.helpers(
    {
      images() {
        if (Session.get("userFilter")) {
          return Images.find({createdBy: Session.get("userFilter")})
        } else {
          return Images.find({}, {sort: {createdOn: 1},
                                  limit: Session.get("imageLimit")});
        }
      },
      rating_id() { return "rating_" + this._id; },
      getUser(user_id) { 
        let user = Meteor.users.findOne({_id: user_id});
        
        if (user) {
          return user.username;
        } else {
          return "anonymous";
        }
      },
      filteringImages() { return (Session.get("userFilter")); },
      getFilterUser() {
        return Meteor.users.findOne(
               {_id: Session.get("userFilter")}).username;
      }
    }
  )

  Template.body.helpers(
    {
      username: function() {
        if (Meteor.user()) {
          return Meteor.user().username;
        }
        else {
          return "jabroni"
        }
      }
    }
  )
  
  Template.images.events(
    {
      'click .js-image': function(event) {
        let img = event.currentTarget;
        if (!img.className.match(/clicked/)) {
          img.classList.add('clicked');
        } else {
          img.classList.remove('clicked');
        }
      },
      'click .js-del-image': function(event) {
        $(event.currentTarget).closest('.thumbnail').parent().hide('slow', function() {
          Images.remove(this._id);
        });
      },
      'click .js-rate-image': function(event) {
        let rating = $(event.currentTarget).data("userrating");
        let img_id = this.id.replace(/rating_/, "");
        Images.update({_id: img_id},
                      {$set: {rating: rating}});
      },
      'click .js-show-image-form': function(event) {
        $('#add_image_form').modal('show');
      },
      'click .js-set-image-filter': function(event) {
        Session.set("userFilter", this.createdBy);
      },
      'click .js-unset-image-filter': function(event) {
        Session.set("userFilter", undefined);
      }
    }
  )
  
  Template.add_image_form.events(
    {
      'submit .js-add-image': function(event) {
        let f = event.target
        let img_src = f.img_src.value;
        let img_alt = f.img_alt.value;
        let title = f.title.value;
        let caption = f.caption.value;
        
        if (Meteor.user()) {
          Images.insert(
            { 
              img_src,
              img_alt,
              title,
              caption,
              createdOn: new Date(),
              createdBy: Meteor.user()._id
            }
          );
        }
        return false;
      }
    }
  )
}