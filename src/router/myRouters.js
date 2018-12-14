const myaccess = () => import("@/views/userInfos/main");
const getOrderList = () => import("@/views/userInfos/getOrderList");
const sendOrderList = () => import("@/views/userInfos/sendOrderList");
const addressList = () => import("@/views/userInfos/addressList");
const addressEdit = () => import("@/views/userInfos/addressEdit");
const orderDetail = () => import("@/views/userInfos/orderDetail");
const sendApplication = () => import("@/views/userInfos/sendApplication");
const sendSuccess = () => import("@/views/userInfos/sendSuccess");
const userVideo = () => import("@/views/userInfos/userVideo");
const upVideo = () => import("@/views/userInfos/upVideo");
const orderChange = () => import("@/views/userInfos/orderChange");

export const myRouter = [
  {
    path: "/myaccess",
    name: "myaccess",
    component: myaccess,
    meta: {
      color: "#000",
      backgroundColor: "#fff"
    },
    children: [
      {
        path: "getOrderList/:status",
        name: "getOrderList",
        component: getOrderList,
        meta: {
          title: "我收到的",
          color: "#000",
          backgroundColor: "#fff"
        }
      },
      {
        path: "sendOrderList/:status",
        name: "sendOrderList",
        component: sendOrderList,
        meta: {
          title: "我送出的",
          color: "#000",
          backgroundColor: "rgb(255, 255, 255)"
        }
      },
      {
        path: "addressList",
        name: "addressList",
        component: addressList,
        meta: {
          title: "我的收货地址",
          color: "#000",
          backgroundColor: "#fff"
        }
      },
      {
        path: "addressEdit",
        name: "addressEdit",
        component: addressEdit,
        meta: {
          title: "新增收货地址",
          color: "#000",
          backgroundColor: "rgb(255, 255, 255)"
        }
      },
      {
        path: "orderDetail",
        name: "orderDetail",
        component: orderDetail,
        meta: {
          title: "订单详情",
          color: "#000",
          backgroundColor: "white"
        }
      },
      {
        path: "sendApplication",
        name: "sendApplication",
        component: sendApplication,
        meta: {
          title: "寄件申请",
          color: "#000",
          backgroundColor: "white"
        }
      },
      {
        path: "sendSuccess",
        name: "sendSuccess",
        component: sendSuccess,
        meta: {
          title: "信息反馈",
          color: "#000",
          backgroundColor: "white"
        }
      },
      {
        path: "userVideo/:status",
        name: "userVideo",
        component: userVideo,
        meta: {
          title: "我的视频",
          color: "#000",
          backgroundColor: "#fff"
        }
      },
      {
        path: "upVideo",
        name: "upVideo",
        component: upVideo,
        meta: {
          title: "感谢视频",
          color: "#000",
          backgroundColor: "#fff"
        }
      },
      {
        path: "orderChange",
        name: "orderChange",
        component: orderChange,
        meta: {
          title: "感谢视频",
          color: "#000",
          backgroundColor: "#fff"
        }
      }
    ]
  }
];

export default myRouter;
