import Index from "@/views/";
import Myrouter from "../router/myRouters";

const Home = () => import("@/views/home/");
const My = () => import("@/views/home/my.vue");
const GoodsDetails = () => import("@/views/goodsDetails/");
const Story = () => import("@/views/Story/index.vue");
const myRelease = () => import("@/views/userInfos/myRelease.vue");

const userLevel = () => import("@/views/userInfos/userLevel.vue");
const auction = () => import("@/views/userInfos/auction.vue");
const UserAttention = () => import("@/views/userInfos/userAttention.vue");
const UserCollect = () => import("@/views/userInfos/userCollect.vue");
const Exchange = () => import("@/views/userInfos/exchange.vue");
const UserMessage = () => import("@/views/userInfos/userMessage.vue");
const Fans = () => import("@/views/userInfos/fans.vue");
const JellyKing = () => import("@/views/userInfos/JellyKing.vue");
const SetUp = () => import("@/views/userInfos/setUp.vue");
const BindPhone = () => import("@/views/userInfos/bindPhone.vue");
const ModifyPwd = () => import("@/views/userInfos/modifyPwd.vue");
const ModifyPwdSure = () => import("@/views/userInfos/modifyPwdSure.vue");

// 发布宝贝router-view过渡页

const ReleaseGoods = () => import("@/views/releaseGoods/main");
// 发布宝贝首页
const ReleaseGoodsIndex = () => import("@/views/releaseGoods/");
// 编辑发布商品信息
const EditGoods = () => import("@/views/releaseGoods/editGoods");
// 编辑发布商品类型
const EditGoodsCategory = () =>
  import("@/views/releaseGoods/editGoodsCategory");
// 发布成功
const ReleaseWin = () => import("@/views/releaseGoods/releaseWin");

// 搜索页
const SearchList = () => import("@/views/search/goodsList");

// 拼团页
const SpellGroup = () => import("@/views/spellGroup");
// 拼团详情页
const SpellGroupDetails = () => import("@/views/spellGroup/spellGroupDetails");
/* eslint no-unused-vars: "off" */
const Robbing = () => import("@/views/Robbing/index.vue");
const storyShow = () => import("@/views/Story/show.vue");
const Task = () => import("@/views/task/index.vue");
const Tasklist = () => import("@/views/task/tasklist.vue");

export const navigation = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "趣闲",
      name: "首页",
      navigation: true,
      // 需要缓存
      keepAlive: true
    },
    icon: "icon-item-home"
  },
  {
    path: "/release",
    component: ReleaseGoods,
    meta: {
      title: "发布宝贝",
      name: "发布",
      navigation: true,
      backgroundColor: "#fff",
      color: "#000",
      isUser: true
    },
    children: [
      {
        path: "",
        redirect: "index"
        // redirect: "/guide/page"
      },
      {
        path: "index",
        name: "ReleaseIndex",
        component: ReleaseGoodsIndex,
        meta: {
          title: "发布宝贝",
          name: "发布",
          navigation: true,
          backgroundColor: "#fff",
          color: "#000",
          isUser: true
        }
      },
      {
        path: "editGoods",
        name: "EditGoods",
        component: EditGoods,
        meta: {
          title: "分享宝贝",
          name: "发布",
          backgroundColor: "#fff",
          // 需要缓存
          keepAlive: true,
          color: "#000",
          isUser: true
        }
      },
      {
        path: "editGoodsCategory",
        name: "EditGoodsCategory",
        component: EditGoodsCategory,
        meta: {
          title: "分享宝贝",
          backgroundColor: "#fff",
          color: "#000",
          isUser: true
        }
      },
      {
        path: "releaseWin",
        name: "ReleaseWin",
        component: ReleaseWin,
        meta: {
          title: "信息反馈",
          backgroundColor: "rgb(255, 255, 255)",
          color: "#000"
        }
      }
    ],
    isHideName: true,
    icon: "icon-item-release"
  },
  {
    path: "/my",
    name: "my",
    // redirect: "/guide/page",
    component: My,
    meta: {
      title: "我的",
      name: "我的",
      background: "linear-gradient(-90deg, #e4385b 0%,#ed577b 100%)",
      color: "#fff",
      navigation: true,
      // 当前页面是否需要用户登录
      isUser: true
    },
    icon: "icon-item-my"
  }
];

export const goods = [
  {
    path: "/goods/details/:id",
    name: "GoodsDetails",
    component: GoodsDetails,
    meta: {
      title: "宝贝详情",
      name: "详情",
      backgroundColor: "#fff",
      color: "#000"
    }
  },
  {
    path: "/spellGroup/details/:id",
    name: "SpellGroupDetails",
    component: SpellGroupDetails,
    meta: {
      title: "拼团详情",
      name: "拼团详情",
      backgroundColor: "#fff",
      color: "#000"
    }
  },
  {
    path: "/search/list",
    name: "SearchList",
    component: SearchList,
    meta: {
      title: "商品搜索",
      name: "商品搜索",
      backgroundColor: "#fff",
      color: "#000",
      // 需要缓存
      keepAlive: true
    }
  }
];

export const myAbout = [
  // 我发布的
  {
    path: "/my/myRelease",
    name: "myRelease",
    component: myRelease,
    meta: {
      title: "画苑冠冕",
      color: "#000",
      backgroundColor: "#fddae0"
    },
    icon: "myList0",
    textname: "我发布的",
    children: []
  },
  // 参与的竞拍
  {
    path: "/my/auction",
    name: "auction",
    component: auction,
    meta: {
      title: "我参与的竞拍"
    },
    icon: "myList1",
    textname: "参与的竞拍"
  },
  // 关注的人
  {
    path: "/my/UserAttention",
    name: "UserAttention",
    component: UserAttention,
    meta: {
      title: "关注的人"
    },
    icon: "myList2",
    textname: "关注的人"
  },
  // 我的消息
  {
    path: "/my/UserMessage",
    name: "UserMessage",
    component: UserMessage,
    meta: {
      title: "我的消息"
    },
    icon: "myList3",
    textname: "我的消息"
  },
  // 我的收藏
  {
    path: "/my/UserCollect",
    name: "UserCollect",
    component: UserCollect,
    meta: {
      title: "收藏的宝贝"
    },
    icon: "myList4",
    textname: "我的收藏"
  },
  // 果冻兑换
  {
    path: "/my/Exchange",
    name: "Exchange",
    component: Exchange,
    meta: {
      title: "果冻兑换"
    },
    icon: "myList5",
    textname: "果冻兑换"
  },
  // 设置
  {
    path: "/my/SetUp",
    name: "SetUp",
    component: SetUp,
    meta: {
      title: "设置"
    },
    icon: "myList6",
    textname: "设置"
  },
  // 果冻王奖励
  {
    path: "/my/JellyKing",
    name: "JellyKing",
    component: JellyKing,
    meta: {
      title: "果冻王奖励"
    }
  },
  // 绑定手机
  {
    path: "/my/BindPhone",
    name: "BindPhone",
    component: BindPhone,
    meta: {
      title: "绑定手机"
    }
  },
  // 修改密码  ModifyPwdSure
  {
    path: "/my/ModifyPwd",
    name: "ModifyPwd",
    component: ModifyPwd,
    meta: {
      title: "修改密码",
      isUser: true
    }
  },
  // 修改密码~确定
  {
    path: "/my/ModifyPwdSure",
    name: "ModifyPwdSure",
    component: ModifyPwdSure,
    meta: {
      title: "修改密码"
    }
  },
  // 用户等级
  {
    path: "/my/userLevel",
    name: "userLevel",
    component: userLevel,
    meta: {
      title: "用户等级"
    }
  },
  // 粉丝
  {
    path: "/my/Fans",
    name: "Fans",
    component: Fans,
    meta: {
      title: "粉丝"
    }
  },
  {
    path: "/story/show/:id",
    name: "storyShow",
    component: storyShow,
    meta: {
      title: "嗮图详情",
      backgroundColor: "#fff",
      color: "#000"
    }
  },
  {
    path: "/home/task",
    name: "Task",
    component: Task,
    meta: {
      title: "赚果冻",
      backgroundColor: "#fff",
      color: "#000"
    }
  },
  {
    path: "/home/task/list",
    name: "Tasklist",
    component: Tasklist,
    meta: {
      title: "奖励详情",
      backgroundColor: "#fff",
      color: "#000"
    }
  }
];

export const other = [
  {
    path: "/happyCurrency",
    redirect: "/guide/page",
    name: "HappyCurrency",
    meta: {
      title: "开心果冻"
    },
    icon: "icon-happy-currency"
  },
  {
    path: "/home/Robbing",
    name: "Robbing",
    component: Robbing,
    meta: {
      title: "抢兑",
      backgroundColor: "#de2245",
      color: "#fff",
      backIcon: "icon-white-back"
    },
    icon: "icon-grab"
  },
  {
    path: "/home/spellGroup",
    name: "SpellGroup",
    component: SpellGroup,
    meta: {
      title: "拼团",
      backgroundColor: "#fff",
      color: "#000"
    },
    icon: "icon-spellGroup"
  },
  {
    path: "/home/friendsGoods",
    name: "FriendsGoods",
    component: SpellGroup,
    meta: {
      title: "友物",
      backgroundColor: "#fff",
      color: "#000"
    },
    icon: "icon-friendsGoods"
  },
  {
    path: "/home/currency",
    name: "Currency",
    component: JellyKing,
    meta: {
      title: "果冻王",
      backgroundColor: "#fff",
      color: "#000"
    },
    icon: "icon-currency"
  },
  {
    path: "/home/envelope",
    name: "Envelope",
    component: JellyKing,
    meta: {
      title: "现金红包",
      backgroundColor: "#fff",
      color: "#000"
    },
    icon: "icon-envelope"
  },
  {
    path: "/home/checkIn",
    name: "CheckIn",
    component: JellyKing,
    meta: {
      title: "签到",
      backgroundColor: "#fff",
      color: "#000"
    },
    icon: "icon-checkIn"
  }
  // {
  //   path: "/home/story",
  //   name: "Story",
  //   component: Story,
  //   meta: {
  //     title: "故事",
  //     backgroundColor: "#fff",
  //     color: "#000"
  //   },
  //   icon: "icon-story"
  // }
  // ,
  // {
  //   path: "/signIn",
  //   name: "SignIn",
  //   component: SignIn,
  //   meta: {
  //     title: "签到",
  //     backgroundColor: "#fff",
  //     color: "#000"
  //   },
  //   icon: "icon-sign-in"
  // }
];

const guidePage = () => import("@/views/guidePage/minProgram");
// 引导页
const guide = [
  {
    path: "/guide/page",
    component: guidePage,
    meta: {
      title: "关注",
      backgroundColor: "#fff",
      color: "#000"
    }
  }
];
// 注册用户
const SignUp = () => import("@/views/signUp/signUp");
// 设置密码
const SetPassword = () => import("@/views/signUp/setPassword");
// 登录
const Login = () => import("@/views/signIn/signIn");

const userControl = [
  {
    path: "/user/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      title: "注册账号",
      backgroundColor: "#fff",
      color: "#000"
    }
  },
  {
    path: "/user/signup/password",
    name: "SignUpPassword",
    component: SetPassword,
    meta: {
      title: "注册账号",
      backgroundColor: "#fff",
      color: "#000"
    }
  },
  {
    path: "/user/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      backgroundColor: "#fff",
      color: "#000"
    }
  }
];
/**
 * 默认路由配置
 */
const defaultRouters = [
  /* eslint-disable */
  {
    path: "/",
    component: Index,
    children: [].concat(
      navigation,
      other,
      goods,
      myAbout,
      Myrouter,
      guide,
      userControl
    )
  }
];

export default defaultRouters;
