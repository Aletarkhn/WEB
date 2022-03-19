
let notifications = [];
try{
  notifications = JSON.parse(localStorage.myNotifications||`[]`);
}
catch(e){
  notifications = [];
}


const jsDateToISO = date =>`${date.getFullYear()}-${(1+date.getMonth()+'').padStart(2,'0')}-${(date.getDate()+'').padStart(2,'0')}`;
const today = jsDateToISO(new Date());
notifydate.value=today;
const getNotifications =(strISODate)=>notifications.filter(o=>o.notifyDate===strISODate);


function showNotifications(){
  ulNotifications.innerHTML='';
  let notifyCnt=0; 
  getNotifications(today).forEach((notification, index)=>{
    notifyCnt++;
    const li = document.createElement('li');
    li.innerHTML = `"${notification.msg}"`;
    ulNotifications.appendChild(li);
  });
  if(notifyCnt>0){
    document.body.className='show-notifications';
  }
}



btnAddNotification.onclick=_=>{
  const jsDate = new Date(notifydate.value);
  notifications.push({
    notifyDate:jsDateToISO(jsDate),
    msg:txtNotifyMsg.value
  });

  saveNotificationsToLocalStorage();
  txtNotifyMsg.value='';
  renderNotifications();
};

function saveNotificationsToLocalStorage(){
  localStorage.myNotifications=JSON.stringify(notifications);
}

function deleteNotification(idx){
  notifications.splice(idx,1);
  saveNotificationsToLocalStorage();
  renderNotifications();
}

function renderNotifications(){
  ulAllNotifications.innerHTML='';
  notifications.forEach((notification, index)=>{
    const li= document.createElement('li');
    li.innerHTML = `<a href="javascript:deleteNotification(${index});void 0">Delete</a> <span>${notification.notifyDate}</span> - "${notification.msg}"${notification.notifyDate===today?' - <b>Shown today</b>':''}`;
    ulAllNotifications.appendChild(li);
  });
}
renderNotifications();
showNotifications();
