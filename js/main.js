const usersContainer = document.getElementById("users-container");
const loadingElem = document.getElementById("loading-container");
const errorMsgElem = document.getElementById("error-msg");
//Get followers from API
const getFolloewersApi = async (user) => {
  try {
    const followers = await (
      await fetch(
        `https://api.github.com/users/${user.login}/followers?per_page=2`
      )
    ).json();
    displayUsers(user, followers);
  } catch (error) {
    console.log("Something went wrong in followers API!", error);
  }
};

//Get github users from API
const getGithubUsersApi = async () => {
  try {
    loadingElem.style.display = "block";
    errorMsgElem.style.display = "none";
    const users = await (
      await fetch(`https://api.github.com/users?per_page=10`)
    ).json();

    loadingElem.style.display = "none";
    errorMsgElem.style.display = "none";
    users.forEach((user) => {
      getFolloewersApi(user);
    });
  } catch (error) {
    loadingElem.style.display = "none";
    errorMsgElem.style.display = "block";
  }
};

//Display github users and related followers
const displayUsers = (user, followers) => {
  const [follower1, follower2] = followers;
  const { avatar_url, login, repos_url } = user;
  usersContainer.innerHTML += `
    <div class="user">
          <div class="user-info">
            <div class="img-container" class="user-avatar">
                <img src="${avatar_url}" alt="User Avatar">
            </div>
            <h2 id="user-name">${login}</h2>
            <p id="user-repo-link"><b>Github Repository Link: </b><span>${repos_url}</span></p>
          </div>
          <div class="follower-info">
            <h3>Followers</h3>
                <div class="followers-img-container">
                <img src="${follower1.avatar_url}" alt="">
                <img src="${follower2.avatar_url}" alt="">
                </div>
          </div>
        </div>
    `;
};
getGithubUsersApi();
