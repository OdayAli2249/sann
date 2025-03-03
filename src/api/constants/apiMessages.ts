const messageTemplates = {
  POST: { success: "Created Successfully!", error: "Couldn't Be Created" },
  PATCH: { success: "Updated Successfully!", error: "Couldn't Be Updated" },
  PUT: { success: "Updated successfully!", error: "Couldn't Be Updated" },
  DELETE: { success: "Deleted successfully!", error: "Couldn't Be Deleted" },
};

export const getAlertMessage = (entity: string, type: "success" | "error", method: string) => {
  if (type === "success")
    return `${entity} ${messageTemplates[method as keyof typeof messageTemplates].success}`;
  return `${entity} ${messageTemplates[method as keyof typeof messageTemplates].error}`;
};
