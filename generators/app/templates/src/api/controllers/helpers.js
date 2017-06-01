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
  return (entity) => {
    try {
      jsonpatch.applyPatch(entity, patches, /* validate */ true);
    } catch (err) {
      return Promise.reject(err);
    }
    return entity.save();
  };
}

function removeEntity(res) {
  return (entity) => {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(200).json({
            message: 'entity deleted',
          });
        });
    }
    return null;
  };
}

export { handleError, handleEntityNotFound, respondWithResult, patchUpdates, removeEntity };
