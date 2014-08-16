
/*                P U B L I C A T I O N S . J S
 * BRL-CAD
 *
 * Copyright (c) 1995-2013 United States Government as represented by
 * the U.S. Army Research Laboratory.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License
 * version 2.1 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this file; see the file named COPYING for more
 * information.
 */

/** @file OGV/server/publications
 *  @brief publishes data from server to client
 */

Meteor.publish('modelFiles', function() {
    return ModelFiles.find();
});

Meteor.publish('objFiles', function() {
    return OBJFiles.find();
});

Meteor.publish('thumbFiles', function() {
    return ThumbFiles.find();
});

Meteor.publish('comments', function() {
    return Comments.find();
});

Meteor.publish('profilePictures', function() {
    return ProfilePictures.find();
});

Meteor.publish('lovers', function(){
    return Lovers.find();
});

Meteor.publish('ogvSettings', function(){
    return OgvSettings.find();
});

/**
 * Not every detail about user is published to client
 * for security reasons
 */
Meteor.publish('profiles', function() {
    return Meteor.users.find({}, {fields: {emails : 1, profile: 1, roles: 1}});
}); 
