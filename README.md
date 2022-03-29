# Don't Sleep Driver

### What is Don't Sleep Driver?

Every year, drowsy driving causes numerous traffic accidents and many people are injured or killed. In Korea, 70% of deaths in highway traffic accidents are due to drowsiness or neglect.

The death rate from drowsy driving is much higher than drunk driving, but awareness of the risks is very low. Drivers who drive alone for long periods of time are vulnerable to drowsy driving.

So, to solve this problem, we created an app to prevent drowsy driving called Dont Sleep Driver.

## Feature

Users can sign in with their email and password and can easily sign up and sign in with OAuth2.0 technology.    

When the user starts driving and presses the start button of the app, it recognizes faces through the camera and determines whether or not they are asleep.

If the user is drowsy while driving, a warning alarm will sound, as well as an alarm for stretching and ventilation every 30 minutes and 2 hours.

You can end driving and inquire about your driving record, gps information and sleep level in the record tab.

## Demo Video  

[![DontSleepDriver](https://user-images.githubusercontent.com/28949213/160598053-71f9ecef-3304-46b9-bb6c-170dade75c15.png)](https://youtu.be/OeRTsWqkZ1Y)

## Repositories
- [Android](https://github.com/gdsc-seoultech/DontSleepDriver_Android)
- [ML](https://github.com/gdsc-seoultech/DontSleepDriver_ML)
- [BackEnd](https://github.com/gdsc-seoultech/DontSleepDriver_Back)

## Project Setting

1. download docker [Link](https://www.docker.com/products/docker-desktop/)
2. **environment variables Setting**   

- root folder make file .development.env
```
DATABASE_URL="mysql://root:rootuserpassword@mysql-dev:3306/dont_sleep_driver_db?schema=public"

//docker Container MySQL
MYSQL_ROOT_USER=root
MYSQL_ROOT_PASSWORD=rootuserpassword
MYSQL_DATABASE=dont_sleep_driver_db

//Email Setting
EMAIL_SERVICE={email platforms }
EMAIL_AUTH_USER={email address}
EMAIL_AUTH_PASSWORD={email password}
EMAIL_HOST={email hosting Service}
EMAIL_PORT=456

//docker Container Redis
REDIS_URL=redis   
REDIS_PORT=6379   

HOST=
PORT=3000
JWT_SECRET={jwt secret code}
JWT_EXPIRES={expires}
```
3. `docker-compose -f docker-compose.dev.yml up` 




## 👨‍👩‍👧‍👦 Team Member


<table algin="center">
   <tr>
      <td colspan="2" align="center"><strong>Back-End</strong></td>
      <td colspan="1" align="center"><strong>Android</strong></td>
      <td colspan="1" align="center"><strong>ML</strong></td>
   </tr>
  <tr>
     <td align="center">
        <a href="https://github.com/InHyeok-J"><img src="https://avatars.githubusercontent.com/u/28949213?v=4" width="150px" alt="조인혁"/><br /><sub><b>조인혁</b></sub></a>
     </td>
    <td align="center">
    <a href="https://github.com/ehrwk"><img src="https://avatars.githubusercontent.com/u/81352045?v=4" width="150px;" alt="윤희서"/><br /><sub><b>윤희서</b></sub></a><br />
    </td>
     <td align="center">
        <a href="https://github.com/comye1"><img src="https://avatars.githubusercontent.com/u/50735594?v=4" width="150px" alt="김예원"/><br /><sub><b>김예원</b></sub></a>
     </td>
     <td align="center">
        <a href="https://github.com/keonju2"><img src="https://avatars.githubusercontent.com/u/54880474?v=4" width="150px" alt="나건주"/><br /><sub><b>나건주</b></sub></a>
  <tr>
</table> 

     
