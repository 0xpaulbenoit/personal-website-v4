---
title: "How to Migrate from AWS S3 to DigitalOcean Spaces in Rails 6"
date: '2020-10-06'
coverImage: "/blog/morants-curve.jpg"
ogImage:
  url: "/blog/morants-curve.jpg"
---


DigitalOcean Spaces is a convenient way to store files. It might be cheaper than AWS S3, depending on your use case. Luckily, the APIs are compatible, so switching is simple. I recently migrated a Rails 6 project that was using AWS S3 to DigitalOcean Spaces.
### Generate Spaces API Keys

The first step is to generate DigitalOcean Spaces API keys to use in your Rails 6 app. In DigitalOcean, click on *API* in the left pane, then click *Generate New Key* next to 'Spaces access keys'
![DigitalOcean Spaces Screenshot2](/blog/spaces1.png)

Write these keys down and save them for later.

### Edit Rails Credentials

Next, we need to add the DigitalOcean Spaces API keys and credentials to Rails. Using [Rails Credentials](https://edgeguides.rubyonrails.org/security.html#custom-credentials) is a secure way to manage them in Rails 6.
In your rails project directory, type *rails credentials:edit*
You will see something like this if you've been using Rails Credentials with AWS already:

``` yaml
 aws:
   access_key_id: ACCESS_KEY_GOES_HERE
   secret_access_key: SECRET_ACCESS_KEY_GOES_HERE
```

Add your DigitalOcean Spaces information under a new *digitalocean* section in the file. You can delete the *aws* section later if it isn't needed.

``` yaml
 aws:
   access_key_id: ACCESS_KEY_GOES_HERE
   secret_access_key: SECRET_ACCESS_KEY_GOES_HERE

 digitalocean:
   access_key_id: ACCESS_KEY_GOES_HERE
   secret_access_key: SECRET_ACCESS_KEY_GOES_HERE
   endpoint: https://REGION.digitaloceanspaces.com
   region: REGION
   bucket: BUCKET_NAME
```

The *access_key_id* and *secret_access_key* are what you generated in the previous step
*endpoint* is from the URL of your Space. You can find it under the title of your Space if you remove the project. Include *https://* in the config field.
*region* can also be found in the URL of your Space.
*bucket* is the name of your Space.
![DigitalOcean Spaces Screenshot](/blog/spaces-endpoint.png)

If you look closely, you can see a single space character before *aws:* and before *digitalocean:*. That space cost me an hour of my life. I'm not bitter.

### Makes Rails Use DigitalOcean Spaces

Now we need to make ActiveStorage in Rails use the DigitalOcean Spaces information we just added to our Rails Credentials. To do that, we need to edit *storage.yml*.

``` yaml
digitalocean:
  service: S3
  access_key_id: <%= Rails.application.credentials.dig(:digitalocean, :access_key_id) %>
  secret_access_key: <%= Rails.application.credentials.dig(:digitalocean, :secret_access_key) %>
  region: <%= Rails.application.credentials.dig(:digitalocean, :region) %>
  bucket: <%= Rails.application.credentials.dig(:digitalocean, :bucket) %>
  endpoint: <%= Rails.application.credentials.dig(:digitalocean, :endpoint) %>
```

*<%= Rails.application.credentials.dig(:digitalocean, :access_key_id) %>* means look in the Rails credentials file, under the *digitalocean* section, for the *access_key_id* field. Edit those if you used different names than in this tutorial.
The service is still S3. That isn't a typo. It's because DigitalOcean Spaces has an API compatible with S3 and Rails hasn't made an official service name for Spaces yet.
Make sure to remove or comment out the AWS/Amazon section of *storage.yml* if you were using it before.
Then, we need to edit our environments to use DigitalOcean Spaces. I would recommend editing *development.rb* first to test your changes. Most likely you'll want to set it to store files on your local disk, but for testing, we can set it to use DigitalOcean Spaces. That way, we won't have to test in the production environment.



Update this line in *development.rb*

``` ruby
  config.active_storage.service = :digitalocean
```

It is set to *:digitalocean* because that's what we defined in *storage.yml*

Test to make sure it works, then update the same line in *production.rb*

You probably want to change it back to store locally for the development environment. Change it to *:local* in *development.rb* to do that.

``` ruby
  config.active_storage.service = :local
```

That's it. That's all it takes to migrate a Rails 6 project from AWS S3 to DigitalOcean Spaces.