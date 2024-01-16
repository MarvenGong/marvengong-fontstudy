const Provider = {
  // 获取指定集合的所有数据
  async fetchAll(ctx) {
      const {
          db,
          params: { collectionName }
      } = ctx;
      const collection = db.collection(collectionName);
      return collection
          .where({
              _id: /.*/
          })
          .get();
  },
  // 支持orderBy、where的条件查询（满足当前需求）
  async query(ctx) {
      const {
          db,
          params: { collectionName, orderBy, where }
      } = ctx;

      let promise = db.collection(collectionName);
      if (Array.isArray(orderBy) && orderBy.length === 2) {
          promise = promise.orderBy(...orderBy);
      }

      if (typeof where === "object") {
          promise = promise.where(where);
      }

      return promise.get();
  }
};

async function dispatch(ctx) {
  return await Provider[ctx.api](ctx);
}

module.exports = {
  Provider,
  dispatch
};