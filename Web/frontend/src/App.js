import React from 'react'
import './App.css';
import Header from './components/Header';
import './bootstrap.min (3).css';
import MessageScreen from './screens/MessageScreen';
import BlogScreen from './screens/BlogScreen';
import UsersScreen from './screens/UsersScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserScreen from './screens/UserScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AdminUsersScreen from './screens/AdminUsersScreen';
import BlogSectionScreen from './screens/BlogSectionScreen';

function App() {
  return (
    <Router>
      <Header />
      <Route path='/messages' component={MessageScreen} exact />
      <Route path='/blogs' component={BlogScreen} exact />
      <Route path='/blogs/:id' component={BlogSectionScreen} />
      <Route path='/' component={UsersScreen} exact />
      <Route path="/login" component={LoginScreen} exact ></Route>
      <Route path="/register" component={RegisterScreen} exact ></Route>
      <Route path="/profile" component={UserProfileScreen} exact></Route>
      <Route path="/profile/edit" component={UserScreen} exact></Route>
      <Route path="/admin/users" component={AdminUsersScreen} exact></Route>
      <Route path="/:id" component={UserProfileScreen}/>
      <Route path="/search/:keyword" component={UsersScreen}/>
    </Router>
  );
}

export default App;
