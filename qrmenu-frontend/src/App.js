
import { Chart } from 'chart.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';


import Home from "./routes/home";
import Restaurant from './routes/restaurant';
import Order from './routes/order';
import Menu from './routes/menumain';
import LoginForm from './components/login';
import AdminHomePage from './components/adminhome';
import CategoryBox from './components/addcategory';
import EditCategory from './components/editcateg';
import { useParams } from 'react-router-dom';
import PreviewList from './components/userhome';
import SubcategoryList from './components/usersubcateg';
import SubCategoryBox from './components/addsubcategory';
import { Provider } from 'react-redux';
import store from './components/store/store';
function App() {
  const EditCategoryWrapper = () => {
    const { categoryId } = useParams();
    return <EditCategory categoryId={categoryId} />;

  };

  return (
    <Provider store={store}>

      <div className="App">

        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/join" element={<LoginForm />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/order" element={<Order />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/editCategory/:categoryId" element={<EditCategoryWrapper />} />
          <Route path="/addCategory" element={<CategoryBox />} />
          <Route path="/preview" element={<PreviewList />} />
          <Route path="/categories/:categoryId/subcategories" element={<SubcategoryList />} />
          <Route path="/addSubCategory/:categoryId" element={<SubCategoryBox />} />

        </Routes>


      </div>

    </Provider>

  );
}

export default App;
