<template>
  <div class="data-list">
    <router-link
      tag="div"
      class="list-item"
      v-for="(item, index) in dataSource"
      :key="index"
      :to="`/goods/details/${item[idKey]}`"
    >
      <div class="user-pic">
        <img :src="item[userAvatarKey]" v-error-to-img="require('../../images/error-to-user.png')" class="pic" />
      </div>
      <div class="top-user-info">
        <div class="img-name">
          <span class="name">{{item[userNameKey]}}</span>
        </div>
        <div class="city-box">
          <span class="icon-city-tag"></span>
          <span class="city">{{item[userCityKey] | filterSubStrName(7)}}</span>
        </div>
      </div>
      <div class="item-pic">
        <img :src="item[srcKey]" v-error-to-img class="pic" :alt="item[nameKey]">
        <span class="saleType" v-if="item[saleTypeIdKey] === 3">{{item[saleTypeIdKey] | filterSaleType}}</span>
        <span v-show="false" class="love-num">
          <em class="icon-love"></em>
          <em class="num">{{item[favorityCountKey]}}</em>可兑换
        </span>
      </div>
      <div class="name">
      <span>{{item[nameKey] | filterSubStrName}}</span>
      </div>
      <div class="dec-goods">
        <div class="price-num">
          <span class="icon-currency"></span>
          <span class="num">{{item[integralKey]}}</span>
        </div>
        <!-- <div class="user-info">
          <span class="city">{{item[userCityKey]}}</span>
          <img :src="item[userAvatarKey]" class="user-pic" />
        </div> -->
        <div class="hurt">
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "goodsList",
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    // 商品ID
    idKey: {
      type: String,
      default: "id"
    },
    // 商品图片
    srcKey: {
      type: String,
      default: "cover"
    },
    // 收藏数
    favorityCountKey: {
      type: String,
      default: "favorityCount"
    },
    // 出售方式
    saleTypeIdKey: {
      type: String,
      default: "saleTypeId"
    },
    // 商品名称
    nameKey: {
      type: String,
      default: "name"
    },
    // 需花费的集分
    integralKey: {
      type: String,
      default: "integral"
    },
    // 用户城市
    userCityKey: {
      type: String,
      default: "userCity"
    },
    // 用户头像
    userAvatarKey: {
      type: String,
      default: "userAvatar"
    },
    // 用户昵称
    userNameKey: {
      type: String,
      default: "userName"
    }
  },
  filters: {
    filterSaleType(type) {
      let result = "";
      switch (+type) {
        case 1:
          result = "普通转售";
          break;
        case 2:
          result = "团购";
          break;
        case 3:
          result = "竞拍";
          break;
        case 4:
          result = "一花购";
          break;
        case 5:
          result = "抢兑一口价";
          break;
        case 6:
          result = "抢兑竞拍";
          break;
        default:
          break;
      }
      return result;
    }
  }
};
</script>

<style scoped>
.data-list {
  padding: 0.3rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.list-item {
  display: flex;
  width: 5.18rem;
  flex-direction: column;
  background: #fff;
  margin-bottom: 0.87rem;
  border-radius: 0.09rem;
  animation: item-entr 1s ease-in-out;
  box-shadow: 0rem 0rem 0.2rem 0rem rgba(0, 0, 0, 0.2);
}
.list-item .item-pic {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 0.09rem 0.09rem 0rem 0rem;
}
.list-item .item-pic .pic {
  border-radius: 0.1rem;
}
img.pic {
  width: 4.7rem;
  height: 4.7rem;
  object-fit: cover;
}
img.pic.width {
  width: 100%;
}
img.pic.height {
  height: 100%;
}
.list-item .saleType {
  position: absolute;
  left: 0;
  top: 0;
  background: #de2245;
  min-width: 1rem;
  height: 0.55rem;
  line-height: 0.55rem;
  font-size: 0.36rem;
  border-top-left-radius: 0.09rem;
  color: #fff;
  padding: 0 0.1rem;
  text-align: center;
}
.list-item .love-num {
  position: absolute;
  right: 0;
  bottom: 0.14rem;
  min-width: 1.1rem;
  height: 0.52rem;
  line-height: 1.5;
  background-color: rgba(0, 0, 0, 0.4);
  border-width: 0.17rem;
  border-top-left-radius: 10px 10px;
  border-bottom-left-radius: 10px 10px;
  font-size: 0.36rem;
  color: #fff;
}
.list-item .love-num .icon-love {
  display: inline-block;
  width: 0.44rem;
  height: 0.37rem;
  background: url("../../images/home/dis_collect.png") no-repeat;
  background-size: 100%;
  margin-left: 0.2rem;
  vertical-align: -1px;
}
.list-item .love-num .num {
  color: #fff;
  font-size: 0.36rem;
  font-weight: normal;
}
.list-item .name {
  font-size: 0.39rem;
  line-height: 0.5rem;
  margin: 0.26rem 0.3rem;
  letter-spacing: -0.008rem;
  color: #353535;
}
.list-item .dec-goods {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.3rem 0.5rem;
}
.list-item .dec-goods .price-num,
.list-item .dec-goods .user-info {
  display: flex;
  align-items: center;
}
.list-item .dec-goods .price-num .icon-currency {
  width: 0.57rem;
  height: 0.57rem;
  background: url("../../images/home/ic_jelly.png") no-repeat;
  background-size: 100%;
}
.list-item .dec-goods .price-num .num {
  font-size: 0.54rem;
  font-size: 0.54rem;
  margin-left: 0.12rem;
  color: #de2245;
}
.list-item .dec-goods .user-info .city {
  color: #888;
  font-size: 0.36rem;
  margin-right: 0.16rem;
}
.list-item .dec-goods .user-info .user-pic {
  width: 0.49rem;
  height: 0.49rem;
  border-radius: 200px;
  background-color: #f8aac2;
}
.top-user-info {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0.16rem 0 0.26rem;
}
.user-pic {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.user-pic .pic {
  width: 0.9rem;
  height: 0.9rem;
  margin-top: -0.45rem;
  border-radius: 200px;
  background-color: #f8aac2;
}
.top-user-info .city {
  color: #777;
  font-size: 0.36rem;
  margin-right: 0.16rem;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.city-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.icon-city-tag {
  width: 0.32rem;
  height: 0.42rem;
  background: url("../../images/icon-city-tag.png") no-repeat;
  background-size: 100%;
  margin-right: 0.11rem;
}
.top-user-info .img-name {
  display: flex;
  align-items: center;
  padding-left: 0.2rem;
}
.top-user-info .name {
  color: #000;
  font-size: 0.36rem;
  margin: 0;
  width: 1.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.hurt {
  width: 0.6rem;
  height: 0.6rem;
  background: url("../../images/dis_collect.png") no-repeat center/contain;
}

@keyframes item-entr {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
</style>
