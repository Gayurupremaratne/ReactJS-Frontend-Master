import React from "react";
import Loadable from "react-loadable";

import Home from "../containers/Home";
import Login from "../containers/Login";
import { Spinner } from "reactstrap";

function Loading() {
  return (
    <div>
      <Spinner animation="border" />
    </div>
  );
}

const Landing = Loadable({
  loader: () => import("../containers/views/Landing"),
  loading: Loading
});

const Category = Loadable({
  loader: () => import("../containers/views/Category"),
  loading: Loading
});
const Publishers = Loadable({
  loader: () => import('../containers/views/Publishers'),
  loading: Loading,
});
const Dashboard = Loadable({
  loader: () => import("../containers/views/Dashboard"),
  loading: Loading
});

const ArticleSubmission = Loadable({
  loader: () => import("../containers/views/ArticleSubmission"),
  loading: Loading
});

const Invoice = Loadable({
  loader: () => import("../containers/views/Invoice"),
  loading: Loading
});

const ArticleHistory = Loadable({
  loader: () => import("../containers/views/ArticleHistory"),
  loading: Loading
});
const ArticleHist = Loadable({
  loader: () => import("../containers/Tables/ArticleHist"),
  loading: Loading
});

const CustomPlans = Loadable({
  loader: () => import("../containers/Tables/CustomPlans"),
  loading: Loading
});

const Publisher = Loadable({
  loader: () => import("../containers/Tables/Publisher"),
  loading: Loading
});

const NewPlan = Loadable({
  loader: () => import("../containers/NewPlan"),
  loading: Loading
});

const Report = Loadable({
  loader: () => import("../containers/views/Report"),
  loading: Loading
});
const Contactus = Loadable({
  loader: () => import("../containers/views/Contactus"),
  loading: Loading
});
const AdvertiserArticleHistory = Loadable({
  loader: () => import("../containers/Tables/AdverstiserArticleHistory"),
  loading: Loading
});
const Notification = Loadable({
  loader: () => import("../containers/Tables/Notification"),
  loading: Loading
});
const AdvertiserCustomPlan = Loadable({
  loader: () => import("../containers/Tables/AdvertiserCustomPlan"),
  loading: Loading
});
const Payments = Loadable({
  loader: () => import("../containers/views/RandonPage"),
  loading: Loading
});
const AdminDashboard = Loadable({
  loader: () => import("../containers/views/AdminDashboard"),
  loading: Loading
});
const CategoryList = Loadable({
  loader: () => import("../containers/views/CategoryList"),
  loading: Loading
});

const CategoryPrice = Loadable({
  loader: () => import("../containers/views/CategoryPrice"),
  loading: Loading
});

const CreatePublisher = Loadable({
  loader: () => import("../containers/views/CreatePublisher"),
  loading: Loading
});

const ViewLanguage = Loadable({
  loader: () => import("../containers/views/ViewLanguage"),
  loading: Loading
});

const InvoiceView = Loadable({
  loader: () => import("../containers/views/InvoiceView"),
  loading: Loading
});

const routes = [
  { path: '/', name: '', component: Home, exact: true },
  { path: '/landing',  component: Landing },
  { path: '/category',  component: Category },
  { path: '/publishers',  component: Publishers },
  { path: '/dashboard',  component: Dashboard },
  { path: '/create-article', component: ArticleSubmission },
  { path: '/admindashboard',  component: AdminDashboard },
  { path: '/invoice',  component: Invoice },
  { path: '/article-history',  component: ArticleHistory },
  { path: '/article-hist',  component: ArticleHist },
  { path: '/customPlans',  component: CustomPlans },
  { path: '/newPlan',  component: NewPlan },
  { path: '/report',  component: Report },
  { path: '/publisher',  component: Publisher },
  { path: '/login',  component: Login },
  { path: '/contactus',  component: Contactus },
  { path: '/advertiserarticle-history',  component: AdvertiserArticleHistory },
  { path: '/notification',  component: Notification },
  { path: '/advertisercustomplan',  component: AdvertiserCustomPlan },
  { path: '/payments',  component: Payments },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admindashboard', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/customPlans', name: 'CustomPlans', component: CustomPlans },
  { path: '/newPlan', name: 'NewPlan', component: NewPlan },
  { path: '/report', name: 'Report', component: Report },
  { path: '/category-price', name: 'CategoryPrice', component: CategoryPrice },
  { path: '/category-list', name: 'category-list', component: CategoryList },
  { path: '/create-publisher', name: 'create-publisher', component: CreatePublisher },
  { path: '/view-language', name: 'view-language', component: ViewLanguage },
  { path: '/publisher', name: 'publisher', component: Publisher },
  { path: '/invoice-view', component: InvoiceView },
  
];

export default routes;
