export const getPagination = (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    return { offset, limit };
  };
  
  export const getFilters = (query: any) => {
    const { actorId, targetId, actionId, search } = query;
    const filters = {
      actorId: actorId ? String(actorId) : undefined,
      targetId: targetId ? String(targetId) : undefined,
      actionId: actionId ? String(actionId) : undefined,
      search: search ? String(search) : undefined,
    };
    return filters;
  };
  