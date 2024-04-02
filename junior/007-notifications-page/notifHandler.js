document.querySelector(".mark-btn").
addEventListener("click", markAsRead);

function markAsRead() {
  let notifications = document.
  querySelectorAll(".notification.notification-unread");
  for (let i = 0; i < 3; i++) {
    notifications[i].classList.remove("notification-unread");
  }
}