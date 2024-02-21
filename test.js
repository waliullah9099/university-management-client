const adminPaths2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "<AdminDashboard />",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "<CreateAdmin />",
      },
      {
        name: "Create Facylty",
        path: "create-faculty",
        element: "<CreateFaculty />",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "<CreateStudent />",
      },
    ],
  },
];

const newArr = adminPaths2.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: "item.element",
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      element: "children route",
      children: item.children.map((item) => ({
        key: item.name,
        label: "Inner Children path",
      })),
    });
  }

  return acc;
}, []);

// console.log(newArr);

const obj = {
  name: "mejbah",
  age: 12,
  welcome: () => {
    return "Hello";
  },
};
console.log(JSON.stringify(obj));
