import { BrowserRouter, Route } from "react-router-dom";
import AddAliment from "./components/user-profile/AddFoodItem";
import Profile from "./components/user-profile/Profile";
import UserAlimentsContainer from "./components/user-profile/UserFoodItems";
import UserReservedFoodItemsContainer from "./components/user-profile/UserReservedFoodItemsContainer";
import FoodItems from "./components/FoodItems/FoodItems";
import FriendsContainer from "./components/friends/FriendsContainer";


import AddFriend from "./components/friends/AddFriend";
import Menu from "./components/menubar/Menu.js";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Menu} />
      <Route exact path="/FoodItems" component={FoodItems} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/add-new-foodItem" component={AddAliment} />
      <Route exact path="/my-FoodItems" component={UserAlimentsContainer} />
      <Route exact path="/friends" component={FriendsContainer} />
      <Route exact path="/add-friend" component={AddFriend} />
    </BrowserRouter>
  );
}

export default App;
