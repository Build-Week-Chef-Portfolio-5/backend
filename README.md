# backend

# Base URL for Deployed API
https://chefposts.herokuapp.com

# Endpoints
| Request | URL | Description |
| ------- | --- | ----------- |
| POST | api/chefs/register | register as a new user/chef |
| POST | api/chefs/login | login as an existing user/chef |
| GET | api/chefs/:id/posts | get posts for logged in user/chef |
| POST | api/chefs/:id/posts | add post for logged in user/chef |


| Request | URL | Description |
| ------- | --- | ----------- |
| GET | api/chefs/posts | get all posts for all chefs (homepage for non-logged in users) |
| GET | api/chefs/posts/:id | get specific post from chef |
| PUT | api/chefs/posts/:id | edit specific post from chef |
| DELETE | api/chefs/posts/:id | delete specific post from chef |



# Table Requirements

# Chefs
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Chef's id |
| name | string | no | no | Chef's full name |
| username | string | yes | yes | Chef's username (max 50 char) |
| password | string | yes | yes | Chef's password (max 100 char) |
| location | string | no | no | Chef's city/town/address |
| contact_info | string | no | no | Chef's email |


# Posts
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | Post id |
| image_url | string | yes | no | image url for post/recipe |
| title | string | yes | no | title for post/recipe (max 50 char) |
| meal_type | string | yes | no | meal type for recipe |
| ingredients | string | yes | no | ingredients for recipe |
| instructions | string | yes | no | step by step instructions for recipe |
| chef_id | string | yes | no | Chef's id associated with post/recipe |