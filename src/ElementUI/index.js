import Vue from "vue";
import { Option, Select, Dialog, MessageBox, Loading, Switch, Pagination, TableColumn, Table, Card, BreadcrumbItem, Breadcrumb, Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem } from "element-ui";
import { BreadcrumbItem, Breadcrumb, Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem } from "element-ui";
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading;
Vue.prototype.$confirm = MessageBox.confirm;
