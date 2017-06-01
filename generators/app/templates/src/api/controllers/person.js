import jsonpatch from 'fast-json-patch';

function respondWithResult(res, statusCode) {
  return (entity) => {
    if (entity) {
      return res.status(statusCode || 200).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  const status = statusCode || 500;
  return (err) => {
    if (err) {
      return res.status(status).json({
        message: err,
      });
    }
    return null;
  };
}

function handleEntityNotFound(res) {
  return (entity) => {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function patchUpdates(patches) {
  console.log(patches);
  return (entity) => {
    console.log(entity);
    try {
      console.log(jsonpatch.applyPatch(entity, patches, /* validate */ true));

    } catch (err) {
      return Promise.reject(err);
    }
    console.log(entity);
    return entity.save();
  };
}

function removeEntity(res) {
  return (entity) => {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
    return null;
  };
}

export default respondWithResult;
export { handleError, handleEntityNotFound, respondWithResult, patchUpdates, removeEntity };
