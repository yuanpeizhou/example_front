import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";


import Student from '../src/components/pages/Student/list'
import StudentEdit from '../src/components/pages/Student/edit'


// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
const routes = [
	{
		path: "/",
		component:Student
	},
	{
	  path: "/student/list/:page",
	  component: Student,
	  	routes: [
			{
				path: "/student/insert",
				component: StudentEdit,
			},
			{
				path: "/student/update/:id",
				component: StudentEdit,
			}
		]
	},
];

/**渲染路由组件 */
export default function RouteConfigExample() {
	return (
		<Switch>
			{RouteWithSubRoutes(routes)}
		</Switch>
	);
}

/**
 * 递归生成路由结构
 * @param {路由树} routes 
 */
function RouteWithSubRoutes(routes) {
	let res = []
	routes.forEach((item, index) => {
		res.push(<Route key={Date.parse(new Date()) + index}  exact path={item.path} component={item.component} />)

		if(item.routes){
			res.push(RouteWithSubRoutes(item.routes)) 
		}
	});

	return (res)
}


