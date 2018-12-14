/*! JRoll-Vue-Infinite v2.0.1 ~ (c) 2017-2018 Author:BarZu Git:https://github.com/chjtx/JRoll/ */
/* global JRoll */
/**
 * 保留原作者注释
 * 增加当加载时禁止重复加载
 */
/* eslint-disable */
JRoll.VueInfinite2 = function () {
  return {
    props: {
      total: [String, Number],
      jrollOptions: Object,
      pulldownOptions: [Object, Boolean],
      propsIsLoading: Boolean,
      hasNextPage: Boolean,
      autoLoad: Boolean
    },
    data: function () {
      return {
        page: 0,
        totals: parseInt(this.total, 10) || 99,
        jroll: null,
        isLoading: false,
        isNextPage: true,
        tip: '',
        loadingTip: '正在加载数据,请稍后',
        completeTip: '没有更多数据了',
        errorTip: '加载失败，上拉重试',
        notDataTip: '暂无数据'
      }
    },
    template: '<div><div><slot></slot><div class="jroll-infinite-tip" v-html="tip"></div></div></div>',
    mounted: function () {
      var me = this
      me.jroll = new JRoll(me.$el, me.jrollOptions);
      // 下拉刷新
      if (me.pulldownOptions) {
        me.pulldownOptions.refresh = function (complete) {
          !me.isLoading && me.$emit('on-pulldown', function () {
            me.page = 1;
            if (me.isNextPage) {
              me.tip = me.loadingTip
            } else {
              me.tip = me.completeTip
            }
            complete();
          }, function () {
            me.tip = me.errorTip
            complete()
          })
        }

        me.jroll.pulldown(me.pulldownOptions)
      }

      me.jroll.on('scrollStart', function () {
        me.$emit('on-scroll-start', this)
      })

      me.jroll.on('scroll', function () {
        me.$emit('on-scroll', this)
      })

      me.jroll.on('scrollEnd', function () {
        me.$emit('on-scroll-end', this);
        if (this.y <= this.maxScrollY + me.jroll.scroller.querySelector('.jroll-infinite-tip').offsetHeight) {
          !me.isLoading && me.$emit('on-scroll-bottom', me.page, function () {
            if (me.isNextPage) {
              me.tip = me.loadingTip
            } else {
              me.tip = me.completeTip
            }
            me.isNextPage && (me.page += 1);
          }, function () {
            me.tip = me.errorTip
          });
        }
      })
      if(me.autoLoad) {
        me.tip = me.loadingTip
        // 首次执行数据加载
        me.$emit('on-scroll-bottom', 0, function () {
          me.page = 1;
          if (me.isNextPage) {
            me.tip = me.loadingTip
          } else {
            me.tip = me.completeTip
          }
        }, function () {
          me.tip = me.errorTip
        });
      }
    },
    updated: function () {
      var me = this
      me.$nextTick(function () {
        if (me.jroll) {
          me.jroll.refresh()
        }
      })
    },
    watch: {
      total: function (val) {
        this.totals = val
      },
      hasNextPage: function(nextValue) {
        this.isNextPage = nextValue;
      },
      propsIsLoading: function(nextValue) {
        this.isLoading = nextValue;
      }
    },
    methods: {
      success(page) {
        page && (this.page = page);
        this.tip = this.isNextPage ? this.loadingTip : this.completeTip;
      },
      error() {
        this.tip = this.errorTip;
      },
      setTip(tip) {
        this.tip = tip;
      },
      pending() {
        this.tip = this.loadingTip;
      },
      notData(text) {
        this.isNextPage = false;
        this.$nextTick(() => {
          this.tip = text || this.notDataTip;
        });
      }
    }
  }
}
