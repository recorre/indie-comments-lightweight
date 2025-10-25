# All Documents

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/41300_indie_commentsv3.md

```
Swagger JSON — 41300_indie_commentsv3

{
  "openapi": "3.0.0",
  "info": {
    "title": "API documentation for 41300_indie_commentsv3",
    "version": "1.0.0",
    "description": "API documentation for 41300_indie_commentsv3"
  },
  "servers": [
    {
      "url": "https://openapi.nocodebackend.com"
    }
  ],
  "paths": {
    "/create/api_usage?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Create a new record in api_usage",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "site_id": {
                    "type": "integer"
                  },
                  "endpoint": {
                    "type": "string"
                  },
                  "method": {
                    "type": "string",
                    "enum": [
                      "get",
                      "post",
                      "put",
                      "delete"
                    ],
                    "description": "dropdown: choose one of [get, post, put, delete]"
                  },
                  "response_time": {
                    "type": "integer"
                  },
                  "status_code": {
                    "type": "integer"
                  },
                  "ip_address": {
                    "type": "string"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "201": {
            "description": "Successfully created the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "message": {
                      "type": "string",
                      "example": "Record created successfully"
                    },
                    "id": {
                      "type": "integer",
                      "description": "ID of the newly created record"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/api_usage?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve all records from api_usage",
        "description": "### Filtering and query options\n\nUse query parameters to filter results. Operators use bracket notation:\n\n| Operator | Example | Meaning |\n|---|---|---|
| `field` | `?status=active` | Equal (default) |
| `field[ne]` | `?status[ne]=inactive` | Not equal |
| `field[gt]` | `?price[gt]=100` | Greater than |
| `field[gte]` | `?date[gte]=2024-05-01` | Greater than or equal |
| `field[lt]` | `?score[lt]=500` | Less than |
| `field[lte]` | `?score[lte]=800` | Less than or equal |
| `field[in]` | `?type[in]=a,b,c` | In list (comma-separated) |
| `field[like]` | `?name[like]=john` | Partial match |\n\n**Examples**\n- `?price[gte]=100&price[lte]=200`\n- `?name[like]=john`\n- `?status=active`\n\n**Additional helpers**\n- **Pagination**: `page`, `limit` (defaults 1, 10)\n- **Totals**: `includeTotal=true` adds `total` and `totalPages`\n- **Sorting**: `sort=colA,colB`, `order=asc,desc`\n- **Single record**: `only=latest` or `only=oldest` (optional `by=column`, defaults `id`)",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "site_id": {
                            "type": "integer"
                          },
                          "endpoint": {
                            "type": "string"
                          },
                          "method": {
                            "type": "string",
                            "enum": [
                              "get",
                              "post",
                              "put",
                              "delete"
                            ],
                            "description": "dropdown: choose one of [get, post, put, delete]"
                          },
                          "response_time": {
                            "type": "integer"
                          },
                          "status_code": {
                            "type": "integer"
                          },
                          "ip_address": {
                            "type": "string"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/api_usage/{id}?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve a record by ID from api_usage",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to retrieve"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "site_id": {
                          "type": "integer"
                        },
                        "endpoint": {
                          "type": "string"
                        },
                        "method": {
                          "type": "string",
                          "enum": [
                            "get",
                            "post",
                            "put",
                            "delete"
                          ],
                          "description": "dropdown: choose one of [get, post, put, delete]"
                        },
                        "response_time": {
                          "type": "integer"
                        },
                        "status_code": {
                          "type": "integer"
                        },
                        "ip_address": {
                          "type": "string"
                        },
                        "created_at": {
                          "type": "string",
                          "format": "date-time"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/search/api_usage?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Search for records in api_usage",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "site_id": {
                    "type": "integer"
                  },
                  "endpoint": {
                    "type": "string"
                  },
                  "method": {
                    "type": "string",
                    "enum": [
                      "get",
                      "post",
                      "put",
                      "delete"
                    ],
                    "description": "dropdown: choose one of [get, post, put, delete]"
                  },
                  "response_time": {
                    "type": "integer"
                  },
                  "status_code": {
                    "type": "integer"
                  },
                  "ip_address": {
                    "type": "string"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved matching records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "site_id": {
                            "type": "integer"
                          },
                          "endpoint": {
                            "type": "string"
                          },
                          "method": {
                            "type": "string",
                            "enum": [
                              "get",
                              "post",
                              "put",
                              "delete"
                            ],
                            "description": "dropdown: choose one of [get, post, put, delete]"
                          },
                          "response_time": {
                            "type": "integer"
                          },
                          "status_code": {
                            "type": "integer"
                          },
                          "ip_address": {
                            "type": "string"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/update/api_usage/{id}?Instance=41300_indie_commentsv3": {
      "put": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Update a record in api_usage",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to update"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "site_id": {
                    "type": "integer"
                  },
                  "endpoint": {
                    "type": "string"
                  },
                  "method": {
                    "type": "string",
                    "enum": [
                      "get",
                      "post",
                      "put",
                      "delete"
                    ],
                    "description": "dropdown: choose one of [get, post, put, delete]"
                  },
                  "response_time": {
                    "type": "integer"
                  },
                  "status_code": {
                    "type": "integer"
                  },
                  "ip_address": {
                    "type": "string"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully updated the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/delete/api_usage/{id}?Instance=41300_indie_commentsv3": {
      "delete": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Delete a record from api_usage",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to delete"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully deleted the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/create/comments?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Create a new record in comments",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "thread_id": {
                    "type": "integer"
                  },
                  "parent_id": {
                    "type": "integer"
                  },
                  "author_name": {
                    "type": "string"
                  },
                  "author_email": {
                    "type": "string"
                  },
                  "author_website": {
                    "type": "string"
                  },
                  "author_ip": {
                    "type": "string"
                  },
                  "author_user_agent": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  },
                  "message_html": {
                    "type": "string"
                  },
                  "status": {
                    "type": "string",
                    "enum": [
                      "pending",
                      "approved",
                      "spam",
                      "rejected"
                    ],
                    "description": "dropdown: choose one of [pending, approved, spam, rejected]"
                  },
                  "spam_score": {
                    "type": "number"
                  },
                  "moderated_by": {
                    "type": "integer"
                  },
                  "moderated_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "is_edited": {
                    "type": "integer"
                  },
                  "edited_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "201": {
            "description": "Successfully created the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "message": {
                      "type": "string",
                      "example": "Record created successfully"
                    },
                    "id": {
                      "type": "integer",
                      "description": "ID of the newly created record"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/comments?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve all records from comments",
        "description": "### Filtering and query options\n\nUse query parameters to filter results. Operators use bracket notation:\n\n| Operator | Example | Meaning |\n|---|---|---|
| `field` | `?status=active` | Equal (default) |
| `field[ne]` | `?status[ne]=inactive` | Not equal |
| `field[gt]` | `?price[gt]=100` | Greater than |
| `field[gte]` | `?date[gte]=2024-05-01` | Greater than or equal |
| `field[lt]` | `?score[lt]=500` | Less than |
| `field[lte]` | `?score[lte]=800` | Less than or equal |
| `field[in]` | `?type[in]=a,b,c` | In list (comma-separated) |
| `field[like]` | `?name[like]=john` | Partial match |\n\n**Examples**\n- `?price[gte]=100&price[lte]=200`\n- `?name[like]=john`\n- `?status=active`\n\n**Additional helpers**\n- **Pagination**: `page`, `limit` (defaults 1, 10)\n- **Totals**: `includeTotal=true` adds `total` and `totalPages`\n- **Sorting**: `sort=colA,colB`, `order=asc,desc`\n- **Single record**: `only=latest` or `only=oldest` (optional `by=column`, defaults `id`)",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "thread_id": {
                            "type": "integer"
                          },
                          "parent_id": {
                            "type": "integer"
                          },
                          "author_name": {
                            "type": "string"
                          },
                          "author_email": {
                            "type": "string"
                          },
                          "author_website": {
                            "type": "string"
                          },
                          "author_ip": {
                            "type": "string"
                          },
                          "author_user_agent": {
                            "type": "string"
                          },
                          "message": {
                            "type": "string"
                          },
                          "message_html": {
                            "type": "string"
                          },
                          "status": {
                            "type": "string",
                            "enum": [
                              "pending",
                              "approved",
                              "spam",
                              "rejected"
                            ],
                            "description": "dropdown: choose one of [pending, approved, spam, rejected]"
                          },
                          "spam_score": {
                            "type": "number"
                          },
                          "moderated_by": {
                            "type": "integer"
                          },
                          "moderated_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "is_edited": {
                            "type": "integer"
                          },
                          "edited_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "modified_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/comments/{id}?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve a record by ID from comments",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to retrieve"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "thread_id": {
                          "type": "integer"
                        },
                        "parent_id": {
                          "type": "integer"
                        },
                        "author_name": {
                          "type": "string"
                        },
                        "author_email": {
                          "type": "string"
                        },
                        "author_website": {
                          "type": "string"
                        },
                        "author_ip": {
                          "type": "string"
                        },
                        "author_user_agent": {
                          "type": "string"
                        },
                        "message": {
                          "type": "string"
                        },
                        "message_html": {
                          "type": "string"
                        },
                        "status": {
                          "type": "string",
                          "enum": [
                            "pending",
                            "approved",
                            "spam",
                            "rejected"
                          ],
                          "description": "dropdown: choose one of [pending, approved, spam, rejected]"
                        },
                        "spam_score": {
                          "type": "number"
                        },
                        "moderated_by": {
                          "type": "integer"
                        },
                        "moderated_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "is_edited": {
                          "type": "integer"
                        },
                        "edited_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "created_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "modified_at": {
                          "type": "string",
                          "format": "date-time"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/search/comments?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Search for records in comments",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "thread_id": {
                    "type": "integer"
                  },
                  "parent_id": {
                    "type": "integer"
                  },
                  "author_name": {
                    "type": "string"
                  },
                  "author_email": {
                    "type": "string"
                  },
                  "author_website": {
                    "type": "string"
                  },
                  "author_ip": {
                    "type": "string"
                  },
                  "author_user_agent": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  },
                  "message_html": {
                    "type": "string"
                  },
                  "status": {
                    "type": "string",
                    "enum": [
                      "pending",
                      "approved",
                      "spam",
                      "rejected"
                    ],
                    "description": "dropdown: choose one of [pending, approved, spam, rejected]"
                  },
                  "spam_score": {
                    "type": "number"
                  },
                  "moderated_by": {
                    "type": "integer"
                  },
                  "moderated_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "is_edited": {
                    "type": "integer"
                  },
                  "edited_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved matching records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "site_id": {
                            "type": "integer"
                          },
                          "endpoint": {
                            "type": "string"
                          },
                          "method": {
                            "type": "string",
                            "enum": [
                              "get",
                              "post",
                              "put",
                              "delete"
                            ],
                            "description": "dropdown: choose one of [get, post, put, delete]"
                          },
                          "response_time": {
                            "type": "integer"
                          },
                          "status_code": {
                            "type": "integer"
                          },
                          "ip_address": {
                            "type": "string"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/update/comments/{id}?Instance=41300_indie_commentsv3": {
      "put": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Update a record in comments",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to update"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "thread_id": {
                    "type": "integer"
                  },
                  "parent_id": {
                    "type": "integer"
                  },
                  "author_name": {
                    "type": "string"
                  },
                  "author_email": {
                    "type": "string"
                  },
                  "author_website": {
                    "type": "string"
                  },
                  "author_ip": {
                    "type": "string"
                  },
                  "author_user_agent": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string"
                  },
                  "message_html": {
                    "type": "string"
                  },
                  "status": {
                    "type": "string",
                    "enum": [
                      "pending",
                      "approved",
                      "spam",
                      "rejected"
                    ],
                    "description": "dropdown: choose one of [pending, approved, spam, rejected]"
                  },
                  "spam_score": {
                    "type": "number"
                  },
                  "moderated_by": {
                    "type": "integer"
                  },
                  "moderated_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "is_edited": {
                    "type": "integer"
                  },
                  "edited_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully updated the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/delete/comments/{id}?Instance=41300_indie_commentsv3": {
      "delete": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Delete a record from comments",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to delete"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully deleted the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/create/moderation_log?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Create a new record in moderation_log",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "comment_id": {
                    "type": "integer"
                  },
                  "moderator_id": {
                    "type": "integer"
                  },
                  "action": {
                    "type": "string",
                    "enum": [
                      "approve",
                      "reject",
                      "spam",
                      "delete"
                    ],
                    "description": "dropdown: choose one of [approve, reject, spam, delete]"
                  },
                  "reason": {
                    "type": "string"
                  },
                  "automated": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "201": {
            "description": "Successfully created the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "message": {
                      "type": "string",
                      "example": "Record created successfully"
                    },
                    "id": {
                      "type": "integer",
                      "description": "ID of the newly created record"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/moderation_log?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve all records from moderation_log",
        "description": "### Filtering and query options\n\nUse query parameters to filter results. Operators use bracket notation:\n\n| Operator | Example | Meaning |\n|---|---|---|
| `field` | `?status=active` | Equal (default) |
| `field[ne]` | `?status[ne]=inactive` | Not equal |
| `field[gt]` | `?price[gt]=100` | Greater than |
| `field[gte]` | `?date[gte]=2024-05-01` | Greater than or equal |
| `field[lt]` | `?score[lt]=500` | Less than |
| `field[lte]` | `?score[lte]=800` | Less than or equal |
| `field[in]` | `?type[in]=a,b,c` | In list (comma-separated) |
| `field[like]` | `?name[like]=john` | Partial match |\n\n**Examples**\n- `?price[gte]=100&price[lte]=200`\n- `?name[like]=john`\n- `?status=active`\n\n**Additional helpers**\n- **Pagination**: `page`, `limit` (defaults 1, 10)\n- **Totals**: `includeTotal=true` adds `total` and `totalPages`\n- **Sorting**: `sort=colA,colB`, `order=asc,desc`\n- **Single record**: `only=latest` or `only=oldest` (optional `by=column`, defaults `id`)",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "comment_id": {
                            "type": "integer"
                          },
                          "moderator_id": {
                            "type": "integer"
                          },
                          "action": {
                            "type": "string",
                            "enum": [
                              "approve",
                              "reject",
                              "spam",
                              "delete"
                            ],
                            "description": "dropdown: choose one of [approve, reject, spam, delete]"
                          },
                          "reason": {
                            "type": "string"
                          },
                          "automated": {
                            "type": "integer"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/moderation_log/{id}?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve a record by ID from moderation_log",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to retrieve"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "comment_id": {
                          "type": "integer"
                        },
                        "moderator_id": {
                          "type": "integer"
                        },
                        "action": {
                          "type": "string",
                          "enum": [
                            "approve",
                            "reject",
                            "spam",
                            "delete"
                          ],
                          "description": "dropdown: choose one of [approve, reject, spam, delete]"
                        },
                        "reason": {
                          "type": "string"
                        },
                        "automated": {
                          "type": "integer"
                        },
                        "created_at": {
                          "type": "string",
                          "format": "date-time"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/search/moderation_log?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Search for records in moderation_log",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "comment_id": {
                    "type": "integer"
                  },
                  "moderator_id": {
                    "type": "integer"
                  },
                  "action": {
                    "type": "string",
                    "enum": [
                      "approve",
                      "reject",
                      "spam",
                      "delete"
                    ],
                    "description": "dropdown: choose one of [approve, reject, spam, delete]"
                  },
                  "reason": {
                    "type": "string"
                  },
                  "automated": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved matching records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "comment_id": {
                            "type": "integer"
                          },
                          "moderator_id": {
                            "type": "integer"
                          },
                          "action": {
                            "type": "string",
                            "enum": [
                              "approve",
                              "reject",
                              "spam",
                              "delete"
                            ],
                            "description": "dropdown: choose one of [approve, reject, spam, delete]"
                          },
                          "reason": {
                            "type": "string"
                          },
                          "automated": {
                            "type": "integer"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/update/moderation_log/{id}?Instance=41300_indie_commentsv3": {
      "put": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Update a record in moderation_log",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to update"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "comment_id": {
                    "type": "integer"
                  },
                  "moderator_id": {
                    "type": "integer"
                  },
                  "action": {
                    "type": "string",
                    "enum": [
                      "approve",
                      "reject",
                      "spam",
                      "delete"
                    ],
                    "description": "dropdown: choose one of [approve, reject, spam, delete]"
                  },
                  "reason": {
                    "type": "string"
                  },
                  "automated": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully updated the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/delete/moderation_log/{id}?Instance=41300_indie_commentsv3": {
      "delete": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Delete a record from moderation_log",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to delete"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully deleted the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/create/sites?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Create a new record in sites",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "user_id": {
                    "type": "integer"
                  },
                  "site_name": {
                    "type": "string"
                  },
                  "site_url": {
                    "type": "string"
                  },
                  "allowed_domains": {
                    "type": "string"
                  },
                  "api_key": {
                    "type": "string"
                  },
                  "secret_token": {
                    "type": "string"
                  },
                  "settings": {
                    "type": "string"
                  },
                  "moderation_mode": {
                    "type": "string",
                    "enum": [
                      "manual",
                      "auto"
                    ],
                    "description": "dropdown: choose one of [manual, auto]"
                  },
                  "spam_filter_level": {
                    "type": "string",
                    "enum": [
                      "off",
                      "low",
                      "medium",
                      "high"
                    ],
                    "description": "dropdown: choose one of [off, low, medium, high]"
                  },
                  "is_active": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "201": {
            "description": "Successfully created the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "message": {
                      "type": "string",
                      "example": "Record created successfully"
                    },
                    "id": {
                      "type": "integer",
                      "description": "ID of the newly created record"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/sites?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve all records from sites",
        "description": "### Filtering and query options\n\nUse query parameters to filter results. Operators use bracket notation:\n\n| Operator | Example | Meaning |\n|---|---|---|
| `field` | `?status=active` | Equal (default) |
| `field[ne]` | `?status[ne]=inactive` | Not equal |
| `field[gt]` | `?price[gt]=100` | Greater than |
| `field[gte]` | `?date[gte]=2024-05-01` | Greater than or equal |
| `field[lt]` | `?score[lt]=500` | Less than |
| `field[lte]` | `?score[lte]=800` | Less than or equal |
| `field[in]` | `?type[in]=a,b,c` | In list (comma-separated) |
| `field[like]` | `?name[like]=john` | Partial match |\n\n**Examples**\n- `?price[gte]=100&price[lte]=200`\n- `?name[like]=john`\n- `?status=active`\n\n**Additional helpers**\n- **Pagination**: `page`, `limit` (defaults 1, 10)\n- **Totals**: `includeTotal=true` adds `total` and `totalPages`\n- **Sorting**: `sort=colA,colB`, `order=asc,desc`\n- **Single record**: `only=latest` or `only=oldest` (optional `by=column`, defaults `id`)",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "user_id": {
                            "type": "integer"
                          },
                          "site_name": {
                            "type": "string"
                          },
                          "site_url": {
                            "type": "string"
                          },
                          "allowed_domains": {
                            "type": "string"
                          },
                          "api_key": {
                            "type": "string"
                          },
                          "secret_token": {
                            "type": "string"
                          },
                          "settings": {
                            "type": "string"
                          },
                          "moderation_mode": {
                            "type": "string",
                            "enum": [
                              "manual",
                              "auto"
                            ],
                            "description": "dropdown: choose one of [manual, auto]"
                          },
                          "spam_filter_level": {
                            "type": "string",
                            "enum": [
                              "off",
                              "low",
                              "medium",
                              "high"
                            ],
                            "description": "dropdown: choose one of [off, low, medium, high]"
                          },
                          "is_active": {
                            "type": "integer"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "modified_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/sites/{id}?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve a record by ID from sites",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to retrieve"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "user_id": {
                          "type": "integer"
                        },
                        "site_name": {
                          "type": "string"
                        },
                        "site_url": {
                          "type": "string"
                        },
                        "allowed_domains": {
                          "type": "string"
                        },
                        "api_key": {
                          "type": "string"
                        },
                        "secret_token": {
                          "type": "string"
                        },
                        "settings": {
                          "type": "string"
                        },
                        "moderation_mode": {
                          "type": "string",
                          "enum": [
                            "manual",
                            "auto"
                          ],
                          "description": "dropdown: choose one of [manual, auto]"
                        },
                        "spam_filter_level": {
                          "type": "string",
                          "enum": [
                            "off",
                            "low",
                            "medium",
                            "high"
                          ],
                          "description": "dropdown: choose one of [off, low, medium, high]"
                        },
                        "is_active": {
                          "type": "integer"
                        },
                        "created_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "modified_at": {
                          "type": "string",
                          "format": "date-time"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/search/sites?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Search for records in sites",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "user_id": {
                    "type": "integer"
                  },
                  "site_name": {
                    "type": "string"
                  },
                  "site_url": {
                    "type": "string"
                  },
                  "allowed_domains": {
                    "type": "string"
                  },
                  "api_key": {
                    "type": "string"
                  },
                  "secret_token": {
                    "type": "string"
                  },
                  "settings": {
                    "type": "string"
                  },
                  "moderation_mode": {
                    "type": "string",
                    "enum": [
                      "manual",
                      "auto"
                    ],
                    "description": "dropdown: choose one of [manual, auto]"
                  },
                  "spam_filter_level": {
                    "type": "string",
                    "enum": [
                      "off",
                      "low",
                      "medium",
                      "high"
                    ],
                    "description": "dropdown: choose one of [off, low, medium, high]"
                  },
                  "is_active": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved matching records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "user_id": {
                            "type": "integer"
                          },
                          "site_name": {
                            "type": "string"
                          },
                          "site_url": {
                            "type": "string"
                          },
                          "allowed_domains": {
                            "type": "string"
                          },
                          "api_key": {
                            "type": "string"
                          },
                          "secret_token": {
                            "type": "string"
                          },
                          "settings": {
                            "type": "string"
                          },
                          "moderation_mode": {
                            "type": "string",
                            "enum": [
                              "manual",
                              "auto"
                            ],
                            "description": "dropdown: choose one of [manual, auto]"
                          },
                          "spam_filter_level": {
                            "type": "string",
                            "enum": [
                              "off",
                              "low",
                              "medium",
                              "high"
                            ],
                            "description": "dropdown: choose one of [off, low, medium, high]"
                          },
                          "is_active": {
                            "type": "integer"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "modified_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/update/sites/{id}?Instance=41300_indie_commentsv3": {
      "put": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Update a record in sites",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to update"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "user_id": {
                    "type": "integer"
                  },
                  "site_name": {
                    "type": "string"
                  },
                  "site_url": {
                    "type": "string"
                  },
                  "allowed_domains": {
                    "type": "string"
                  },
                  "api_key": {
                    "type": "string"
                  },
                  "secret_token": {
                    "type": "string"
                  },
                  "settings": {
                    "type": "string"
                  },
                  "moderation_mode": {
                    "type": "string",
                    "enum": [
                      "manual",
                      "auto"
                    ],
                    "description": "dropdown: choose one of [manual, auto]"
                  },
                  "spam_filter_level": {
                    "type": "string",
                    "enum": [
                      "off",
                      "low",
                      "medium",
                      "high"
                    ],
                    "description": "dropdown: choose one of [off, low, medium, high]"
                  },
                  "is_active": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully updated the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/delete/sites/{id}?Instance=41300_indie_commentsv3": {
      "delete": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Delete a record from sites",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to delete"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully deleted the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/create/threads?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Create a new record in threads",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "site_id": {
                    "type": "integer"
                  },
                  "page_url": {
                    "type": "string"
                  },
                  "page_identifier": {
                    "type": "string"
                  },
                  "page_title": {
                    "type": "string"
                  },
                  "comment_count": {
                    "type": "integer"
                  },
                  "is_locked": {
                    "type": "integer"
                  },
                  "first_comment_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "last_comment_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "201": {
            "description": "Successfully created the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "message": {
                      "type": "string",
                      "example": "Record created successfully"
                    },
                    "id": {
                      "type": "integer",
                      "description": "ID of the newly created record"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/threads?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve all records from threads",
        "description": "### Filtering and query options\n\nUse query parameters to filter results. Operators use bracket notation:\n\n| Operator | Example | Meaning |\n|---|---|---|
| `field` | `?status=active` | Equal (default) |
| `field[ne]` | `?status[ne]=inactive` | Not equal |
| `field[gt]` | `?price[gt]=100` | Greater than |
| `field[gte]` | `?date[gte]=2024-05-01` | Greater than or equal |
| `field[lt]` | `?score[lt]=500` | Less than |
| `field[lte]` | `?score[lte]=800` | Less than or equal |
| `field[in]` | `?type[in]=a,b,c` | In list (comma-separated) |
| `field[like]` | `?name[like]=john` | Partial match |\n\n**Examples**\n- `?price[gte]=100&price[lte]=200`\n- `?name[like]=john`\n- `?status=active`\n\n**Additional helpers**\n- **Pagination**: `page`, `limit` (defaults 1, 10)\n- **Totals**: `includeTotal=true` adds `total` and `totalPages`\n- **Sorting**: `sort=colA,colB`, `order=asc,desc`\n- **Single record**: `only=latest` or `only=oldest` (optional `by=column`, defaults `id`)",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "site_id": {
                            "type": "integer"
                          },
                          "page_url": {
                            "type": "string"
                          },
                          "page_identifier": {
                            "type": "string"
                          },
                          "page_title": {
                            "type": "string"
                          },
                          "comment_count": {
                            "type": "integer"
                          },
                          "is_locked": {
                            "type": "integer"
                          },
                          "first_comment_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "last_comment_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/threads/{id}?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve a record by ID from threads",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to retrieve"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "site_id": {
                          "type": "integer"
                        },
                        "page_url": {
                          "type": "string"
                        },
                        "page_identifier": {
                          "type": "string"
                        },
                        "page_title": {
                          "type": "string"
                        },
                        "comment_count": {
                          "type": "integer"
                        },
                        "is_locked": {
                          "type": "integer"
                        },
                        "first_comment_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "last_comment_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "created_at": {
                          "type": "string",
                          "format": "date-time"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/search/threads?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Search for records in threads",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "site_id": {
                    "type": "integer"
                  },
                  "page_url": {
                    "type": "string"
                  },
                  "page_identifier": {
                    "type": "string"
                  },
                  "page_title": {
                    "type": "string"
                  },
                  "comment_count": {
                    "type": "integer"
                  },
                  "is_locked": {
                    "type": "integer"
                  },
                  "first_comment_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "last_comment_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved matching records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "site_id": {
                            "type": "integer"
                          },
                          "page_url": {
                            "type": "string"
                          },
                          "page_identifier": {
                            "type": "string"
                          },
                          "page_title": {
                            "type": "string"
                          },
                          "comment_count": {
                            "type": "integer"
                          },
                          "is_locked": {
                            "type": "integer"
                          },
                          "first_comment_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "last_comment_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/update/threads/{id}?Instance=41300_indie_commentsv3": {
      "put": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Update a record in threads",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to update"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "site_id": {
                    "type": "integer"
                  },
                  "page_url": {
                    "type": "string"
                  },
                  "page_identifier": {
                    "type": "string"
                  },
                  "page_title": {
                    "type": "string"
                  },
                  "comment_count": {
                    "type": "integer"
                  },
                  "is_locked": {
                    "type": "integer"
                  },
                  "first_comment_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "last_comment_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully updated the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/delete/threads/{id}?Instance=41300_indie_commentsv3": {
      "delete": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Delete a record from threads",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to delete"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully deleted the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/create/users?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Create a new record in users",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "password_hash": {
                    "type": "string"
                  },
                  "plan": {
                    "type": "string",
                    "enum": [
                      "free",
                      "supporter"
                    ],
                    "description": "dropdown: choose one of [free, supporter]"
                  },
                  "sites_limit": {
                    "type": "integer"
                  },
                  "api_calls_limit": {
                    "type": "integer"
                  },
                  "bmc_supporter_id": {
                    "type": "string"
                  },
                  "email_verified": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "201": {
            "description": "Successfully created the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "success"
                    },
                    "message": {
                      "type": "string",
                      "example": "Record created successfully"
                    },
                    "id": {
                      "type": "integer",
                      "description": "ID of the newly created record"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/users?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve all records from users",
        "description": "### Filtering and query options\n\nUse query parameters to filter results. Operators use bracket notation:\n\n| Operator | Example | Meaning |\n|---|---|---|
| `field` | `?status=active` | Equal (default) |
| `field[ne]` | `?status[ne]=inactive` | Not equal |
| `field[gt]` | `?price[gt]=100` | Greater than |
| `field[gte]` | `?date[gte]=2024-05-01` | Greater than or equal |
| `field[lt]` | `?score[lt]=500` | Less than |
| `field[lte]` | `?score[lte]=800` | Less than or equal |
| `field[in]` | `?type[in]=a,b,c` | In list (comma-separated) |
| `field[like]` | `?name[like]=john` | Partial match |\n\n**Examples**\n- `?price[gte]=100&price[lte]=200`\n- `?name[like]=john`\n- `?status=active`\n\n**Additional helpers**\n- **Pagination**: `page`, `limit` (defaults 1, 10)\n- **Totals**: `includeTotal=true` adds `total` and `totalPages`\n- **Sorting**: `sort=colA,colB`, `order=asc,desc`\n- **Single record**: `only=latest` or `only=oldest` (optional `by=column`, defaults `id`)",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string"
                          },
                          "password_hash": {
                            "type": "string"
                          },
                          "plan": {
                            "type": "string",
                            "enum": [
                              "free",
                              "supporter"
                            ],
                            "description": "dropdown: choose one of [free, supporter]"
                          },
                          "sites_limit": {
                            "type": "integer"
                          },
                          "api_calls_limit": {
                            "type": "integer"
                          },
                          "bmc_supporter_id": {
                            "type": "string"
                          },
                          "email_verified": {
                            "type": "integer"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "modified_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/read/users/{id}?Instance=41300_indie_commentsv3": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Retrieve a record by ID from users",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to retrieve"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved the record",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "email": {
                          "type": "string"
                        },
                        "password_hash": {
                          "type": "string"
                        },
                        "plan": {
                          "type": "string",
                          "enum": [
                            "free",
                            "supporter"
                          ],
                          "description": "dropdown: choose one of [free, supporter]"
                        },
                        "sites_limit": {
                          "type": "integer"
                        },
                        "api_calls_limit": {
                          "type": "integer"
                        },
                        "bmc_supporter_id": {
                          "type": "string"
                        },
                        "email_verified": {
                          "type": "integer"
                        },
                        "created_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "modified_at": {
                          "type": "string",
                          "format": "date-time"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/search/users?Instance=41300_indie_commentsv3": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Search for records in users",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "password_hash": {
                    "type": "string"
                  },
                  "plan": {
                    "type": "string",
                    "enum": [
                      "free",
                      "supporter"
                    ],
                    "description": "dropdown: choose one of [free, supporter]"
                  },
                  "sites_limit": {
                    "type": "integer"
                  },
                  "api_calls_limit": {
                    "type": "integer"
                  },
                  "bmc_supporter_id": {
                    "type": "string"
                  },
                  "email_verified": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved matching records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string"
                          },
                          "password_hash": {
                            "type": "string"
                          },
                          "plan": {
                            "type": "string",
                            "enum": [
                              "free",
                              "supporter"
                            ],
                            "description": "dropdown: choose one of [free, supporter]"
                          },
                          "sites_limit": {
                            "type": "integer"
                          },
                          "api_calls_limit": {
                            "type": "integer"
                          },
                          "bmc_supporter_id": {
                            "type": "string"
                          },
                          "email_verified": {
                            "type": "integer"
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "modified_at": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/update/users/{id}?Instance=41300_indie_commentsv3": {
      "put": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Update a record in users",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to update"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "password_hash": {
                    "type": "string"
                  },
                  "plan": {
                    "type": "string",
                    "enum": [
                      "free",
                      "supporter"
                    ],
                    "description": "dropdown: choose one of [free, supporter]"
                  },
                  "sites_limit": {
                    "type": "integer"
                  },
                  "api_calls_limit": {
                    "type": "integer"
                  },
                  "bmc_supporter_id": {
                    "type": "string"
                  },
                  "email_verified": {
                    "type": "integer"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "modified_at": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully updated the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/delete/users/{id}?Instance=41300_indie_commentsv3": {
      "delete": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Delete a record from users",
        "parameters": [
          {
            "$ref": "#/components/parameters/Instance"
          },
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "The ID of the record to delete"
          }
        ],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully deleted the record"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Record Not Found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "parameters": {
      "Instance": {
        "name": "Instance",
        "in": "query",
        "required": true,
        "schema": {
          "type": "string",
          "default": "41300_indie_commentsv3"
        },
        "description": "Instance Name"
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    {
      "name": "Endpoints",
      "description": "Operations related to the API endpoints"
    },
    {
      "name": "Join Endpoints",
      "description": "Operations related to table joins"
    }
  ]
}


Filtering and query options

Use query parameters to filter results. Operators use bracket notation:
Operator	Example	Meaning
field	?status=active	Equal (default)
field[ne]	?status[ne]=inactive	Not equal
field[gt]	?price[gt]=100	Greater than
field[gte]	?date[gte]=2024-05-01	Greater than or equal
field[lt]	?score[lt]=500	Less than
field[lte]	?score[lte]=800	Less than or equal
field[in]	?type[in]=a,b,c	In list (comma-separated)
field[like]	?name[like]=john	Partial match

Examples

    ?price[gte]=100&price[lte]=200
    ?name[like]=john
    ?status=active

Additional helpers

    Pagination: page, limit (defaults 1, 10)
    Totals: includeTotal=true adds total and totalPages
    Sorting: sort=colA,colB, order=asc,desc
    Single record: only=latest or only=oldest (optional by=column, defaults id)

```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/docs/RAILWAY_DEPLOYMENT.md

```
# Deployment Guide for Backend Server

## Deploying to Railway

This guide explains how to deploy only the backend server to Railway without the frontend components.

### Prerequisites
- Railway account (https://railway.app)
- Backend server code with proper package.json
- API keys ready for configuration

### Step-by-Step Deployment

#### 1. Prepare Backend-Only Directory
Create a directory containing only the backend files:

```bash
# From the indie-comments-lightweight directory
cd indie-comments-lightweight/server

# Or create a standalone backend directory
mkdir indie-comments-backend
cp -r indie-comments-lightweight/server/* indie-comments-backend/
cd indie-comments-backend
```

#### 2. Verify package.json
Ensure your package.json has the correct start script:

```json
{
  "name": "indie-comments-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "axios": "^1.6.2",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

#### 3. Deploy to Railway

1. **Via Railway CLI:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   railway init
   
   # Link to your project
   railway link
   
   # Deploy
   railway up
   ```

2. **Via GitHub Integration:**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repository containing only the backend code
   - Complete the setup

#### 4. Configure Environment Variables

In Railway's dashboard, under your project's "Variables" section, add:

```
API_BASE_URL=https://openapi.nocodebackend.com
INSTANCE=41300_indie_commentsv3
PUBLIC_API_KEY=your_public_key_here
ADMIN_API_KEY=your_admin_key_here
SYSTEM_API_KEY=your_system_key_here  # optional
PORT=PORT                           # Railway's dynamic port (set as PORT=PORT)
FRONTEND_URL=https://your-frontend-domain.com  # Your frontend URL
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000         # 15 minutes (optional)
RATE_LIMIT_MAX_REQUESTS=100         # requests per window (optional)
```

**Important:** The `PORT` variable should be set to `PORT=PORT` so Railway can inject its dynamic port assignment.

#### 5. Configure Build Settings (if needed)

In Railway, make sure:
- **Build Command**: `npm install` (usually auto-detected)
- **Start Command**: `npm start` or `node server.js`
- **Root Directory**: `/` (or leave as default)

#### 6. Verify Deployment

After deployment:
1. Check the logs for any errors
2. Verify the service is running on the assigned URL
3. Test the health endpoint: `https://your-project-name.up.railway.app/health`


### Troubleshooting

#### Common Issues:

1. **Port Binding Error:**
   - Ensure `PORT` environment variable is set in Railway
   - Server.js should use `process.env.PORT`

2. **Missing Dependencies:**
   - Verify all dependencies are in package.json
   - Check that package-lock.json is present

3. **Environment Variables:**
   - Ensure all required API keys are set
   - Check for typos in variable names

4. **Startup Timeout:**
   - Make sure the start command is correct
   - Check that the server properly binds to the assigned PORT


### Production Considerations

#### Security:
- Use HTTPS in production
- Rotate API keys regularly
- Monitor API usage
- Implement proper error handling

#### Performance:
- Configure appropriate rate limiting
- Monitor response times
- Consider caching strategies

#### Monitoring:
- Check Railway logs regularly
- Set up alerts for errors
- Monitor API usage statistics


### Frontend Integration

Once your backend is deployed:
1. Update your frontend to point to the new Railway backend URL
2. Example: Change API calls from `http://localhost:3001/api` to `https://your-project-name.up.railway.app/api`
3. Update CORS configuration in your frontend if needed


### Scaling

Railway will automatically handle scaling based on traffic, but you can:
- Monitor resource usage
- Upgrade plan if needed
- Configure environment variables for scaling options
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/server/README.md

```
# Indie Comments Backend Proxy

A secure backend proxy service for the Indie Comments widget that protects API keys and provides a clean API interface.

Para documentação completa, consulte o [guia completo](../docs/COMPREHENSIVE_GUIDE.md) na pasta docs.

## Features

- 🔒 **Secure API Key Management**: API keys are stored server-side, never exposed to the frontend
- 🛡️ **Security Middleware**: Helmet, CORS, rate limiting, and input validation
- 📝 **Comment Management**: Create, read, and moderate comments through secure endpoints
- 👨‍💼 **Admin Panel Support**: Dedicated endpoints for comment moderation
- 📊 **Analytics**: API usage tracking and analytics
- ⚡ **Performance**: Efficient proxying with proper error handling

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your actual API keys:
   ```env
   API_BASE_URL=https://openapi.nocodebackend.com
   INSTANCE=41300_indie_commentsv3
   PUBLIC_API_KEY=your_public_widget_key_here
   ADMIN_API_KEY=your_admin_key_here
   SYSTEM_API_KEY=your_system_key_here
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the server:**
   ```bash
   npm run dev  # Development with auto-reload
   npm start    # Production
   ```

## API Endpoints

### Widget Endpoints (Public)
- `GET /api/comments?thread_id={id}&status=approved` - Fetch approved comments
- `POST /api/comments` - Submit new comment
- `POST /api/threads` - Create comment thread

### Admin Endpoints
- `GET /api/admin/comments?status=pending` - Fetch pending comments
- `PUT /api/admin/comments/{id}` - Update comment status
- `POST /api/admin/moderation-log` - Log moderation actions

### Analytics
- `GET /api/analytics/api-usage` - API usage statistics

## Security Features

- **API Key Protection**: Keys never leave the server
- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Protection**: Configured for specific frontend domains
- **Error Handling**: Secure error responses without sensitive data leakage

## Development

```bash
npm run dev      # Start with nodemon
npm test         # Run tests
npm run lint     # Lint code
```

## Deployment

1. Set environment variables in your deployment platform
2. Ensure HTTPS is enabled
3. Configure proper CORS origins
4. Set up monitoring and logging

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_BASE_URL` | External API base URL | Yes |
| `INSTANCE` | API instance identifier | Yes |
| `PUBLIC_API_KEY` | Key for public widget operations | Yes |
| `ADMIN_API_KEY` | Key for admin operations | Yes |
| `SYSTEM_API_KEY` | Full access key for system operations | No |
| `PORT` | Server port | No (default: 3001) |
| `FRONTEND_URL` | Allowed frontend origin | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | No |

## License

MIT
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/admin-landing/README.md

```
# Lightweight Admin and Landing Page

## Overview
This project contains a lightweight landing page and admin dashboard for the Indie Comments widget, built with vanilla HTML/CSS/JS using PicoCSS for styling.

Para documentação completa, consulte o [guia completo](../docs/COMPREHENSIVE_GUIDE.md) na pasta docs.

## Components

### Landing Page (`index.html`)
- Static landing page showcasing the comment widget
- Interactive widget demo
- Features and benefits section
- Quick integration guide
- Responsive design

### Admin Dashboard (`admin.html`)
- Comment moderation interface
- Pending comment management
- Approval/rejection functionality
- Spam filtering
- Responsive design

## Features
- Lightweight implementation using vanilla JS
- No external dependencies
- Fast loading times
- Responsive design
- Secure API communication through backend proxy
- Markdown support for comments
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/widget/README.md

```
# Lightweight Comment Widget

## Descrição

Widget de comentários leve e eficiente usando Web Components e PicoCSS. Desenvolvido para ser simples de integrar, rápido e compatível com uma ampla variedade de browsers e dispositivos.

Para documentação completa, consulte o [guia completo](../docs/COMPREHENSIVE_GUIDE.md) na pasta docs.

## Tecnologias

- JavaScript vanilla
- Web Components (Custom Elements + Shadow DOM)
- PicoCSS
- Fetch API
- HTML5

## Funcionalidades

- Carregar e exibir comentários
- Envio de novos comentários
- Validação de formulário
- Design responsivo
- Compatibilidade com browsers modernos
- Suporte a Markdown básico (negrito, itálico, cabeçalhos, código)

## Instalação

1. Adicione o arquivo JavaScript do widget à sua página:
   ```html
   <script src="path/to/comment-widget.js"></script>
   ```

2. Adicione o elemento do widget onde desejar exibir os comentários:
   ```html
   <comment-widget thread-id="123"></comment-widget>
   ```

## Configurações

| Atributo | Descrição |
|----------|-----------|
| `thread-id` | ID do tópico de comentários |
| `api-base-url` | URL base da API (opcional, padrão: `/api`) |

## Desenvolvimento

### Estrutura de Arquivos

```
lightweight-comment-widget/
├── README.md
├── index.html
├── src/
│   └── comment-widget.js
├── css/
│   ├── pico.min.css
│   └── widget.css
└── dist/
    └── comment-widget.min.js
```

### Scripts

- `npm run build` - Compilação e minificação do widget
- `npm run dev` - Servidor de desenvolvimento com hot reload
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/docs/SETUP_GUIDE.md

```
# Setup Guide for Admin and Landing Pages

## Overview
This guide explains how to set up the lightweight admin dashboard and landing page for the Indie Comments widget.

## Prerequisites
- Backend proxy server running (e.g., at http://localhost:3001)
- Admin API key for backend authentication
- Web server to host the static files

## Installation

### 1. File Structure
Place the files in your web server directory:
```
your-web-root/
├── index.html          # Landing page
├── admin.html          # Admin dashboard
├── css/
│   ├── pico.min.css    # PicoCSS framework
│   └── custom.css      # Custom styles
├── js/
│   └── admin.js        # Admin functionality
└── docs/
    ├── API_REFERENCE.md # API documentation
    └── SETUP_GUIDE.md   # This file
```

### 2. Backend Configuration
1. Ensure your backend proxy is running at the configured URL (default: `http://localhost:3001/api`)
2. Update the `API_BASE_URL` in admin.html if needed
3. Have your admin API key ready

### 3. Admin Authentication
The admin dashboard expects the admin API key to be stored in localStorage:
```javascript
localStorage.setItem('adminApiKey', 'your-actual-admin-key');
```

In a production environment, you'd typically have a login form that authenticates the user and stores the key only after successful authentication.

### 4. Customization
- Update the landing page content to match your branding
- Modify colors in custom.css if needed
- Adjust API endpoints in admin.js if your backend URL differs

## Security Considerations
- Always use HTTPS in production
- Store the admin API key securely
- Implement proper authentication in production
- The landing page is static and can be cached aggressively
- Admin page requires authentication to access comment moderation features

## Deployment
### Static Hosting
Both pages are static HTML files that can be hosted on any static hosting service:
- Netlify, Vercel, GitHub Pages, etc.
- Traditional web servers (Apache, Nginx)

### Backend Communication
- Landing page only needs to be able to reach the backend proxy
- Admin dashboard needs to authenticate with the backend proxy
- All API keys remain server-side in the backend proxy

## Maintenance
- The static landing page requires no maintenance once deployed
- The admin dashboard has minimal JavaScript dependencies
- Updates to functionality only require updating the HTML/JS files
- Backend API changes may require updates to admin.js
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/docs/API_REFERENCE.md

```
# API Reference for Indie Comments Widget

## Base URL
The API endpoints are accessible through the backend proxy at `http://localhost:3001/api/`.

## Endpoints

### Widget Endpoints (Public)

#### GET `/api/comments`
Fetch comments for a specific thread.

**Parameters:**
- `thread_id` (integer, required): The ID of the thread to fetch comments for
- `status` (string, optional): Filter by status ('approved' by default, or 'pending')

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "thread_id": 123,
      "parent_id": null,
      "author_name": "John Doe",
      "author_email": "john@example.com",
      "author_website": "http://johndoe.com",
      "message": "This is a sample comment",
      "status": "approved",
      "spam_score": 0.1,
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### POST `/api/comments`
Submit a new comment to a thread.

**Body:**
```json
{
  "thread_id": 123,
  "author_name": "John Doe",
  "author_email": "john@example.com",
  "author_website": "http://johndoe.com",
  "message": "This is my comment",
  "parent_id": null
}
```

**Validation:**
- `thread_id` must be an integer
- `author_name` required, 1-100 characters
- `message` required, 1-10000 characters
- `author_email` optional, must be valid email
- `author_website` optional, must be valid URL
- `parent_id` optional, must be integer

**Response:**
```json
{
  "status": "success",
  "message": "Record created successfully",
  "id": 123
}
```

#### POST `/api/threads`
Create a new comment thread for a page.

**Body:**
```json
{
  "site_id": 1,
  "page_url": "https://example.com/article",
  "page_title": "My Article"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Record created successfully",
  "id": 456
}
```

### Admin Endpoints (Protected)

#### GET `/api/admin/comments`
Fetch comments for admin review.

**Parameters:**
- `status` (string, optional): Filter by status ('pending' by default)
- `limit` (integer, optional): Number of records (1-100, default 50)

#### PUT `/api/admin/comments/{id}`
Update comment status.

**Body:**
```json
{
  "status": "approved"  // 'approved', 'rejected', or 'spam'
}
```

## Error Responses

Standard error response format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Backend Proxy Configuration

The backend proxy handles all external API communications securely, protecting API keys by keeping them server-side only.
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/docs/COMPREHENSIVE_GUIDE.md

```
# Indie Comments - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [API Reference](#api-reference)
5. [Components](#components)
6. [Security](#security)
7. [Deployment](#deployment)

## Overview
Indie Comments is a lightweight, privacy-focused comment system that consists of:
- A backend proxy server (Node.js/Express)
- A lightweight comment widget (Web Components)
- Admin dashboard (vanilla HTML/CSS/JS)
- Landing page (static HTML)

The system protects API keys by keeping them server-side while providing a seamless commenting experience.

## Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   User's        │    │  Backend Proxy   │    │  External API    │
│   Browser       │───▶│  (server/)       │───▶│  (no-code       │
│                 │    │                  │    │   backend)       │
│  - Widget      │    │  - API Key       │    │                  │
│  - Admin       │    │    management    │    │  - Comments      │
│  - Landing     │    │  - Rate limiting │    │  - Threads       │
│                │    │  - Validation    │    │  - Users         │
└─────────────────┘    └──────────────────┘    └──────────────────┘
```

### Components:
1. **Backend Proxy** - Secures API keys and handles requests
2. **Comment Widget** - Lightweight Web Component
3. **Admin Dashboard** - Moderate comments
4. **Landing Page** - Static marketing page

## Setup Instructions

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd indie-comments-lightweight/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys
   ```

4. Start the server:
   ```bash
   npm run dev  # For development
   npm start    # For production
   ```

### Frontend Usage
All frontend components are static and can be opened directly in the browser:
- **Widget demo**: `widget/index.html`
- **Landing page**: `admin-landing/index.html` 
- **Admin dashboard**: `admin-landing/admin.html` 

## API Reference

### Widget Endpoints (Public)
- `GET /api/comments?thread_id={id}&status={status}` - Fetch comments
- `POST /api/comments` - Submit comment
- `POST /api/threads` - Create thread

### Admin Endpoints (Protected)
- `GET /api/admin/comments?status={status}&limit={limit}` - Fetch comments
- `PUT /api/admin/comments/{id}` - Update comment status
- `POST /api/admin/moderation-log` - Log moderation

All endpoints require proper API keys set in server environment.

## Components

### Comment Widget
- Built with Web Components (custom elements + shadow DOM)
- Supports Markdown formatting
- Responsive design with PicoCSS
- Client-side validation
- Lightweight (~5KB)

### Admin Dashboard
- Comment moderation interface
- Status filtering
- Approval/rejection functionality
- Statistics display
- Secure API communication

### Landing Page
- Static marketing page
- Widget demonstration
- Integration instructions
- Responsive design

## Security

### Backend Security
- API keys stored server-side only
- CORS configured for specific origins
- Rate limiting implemented
- Input validation on all endpoints
- Helmet.js for security headers

### Frontend Security
- HTML sanitization for comments
- XSS prevention
- Secure API communication
- No direct API key exposure

## Deployment

### Backend Server
1. Set environment variables:
   - `NODE_ENV=production`
   - `FRONTEND_URL` to your frontend domain
   - API keys properly configured

2. Deploy options:
   - Railway, Vercel, Heroku, or any Node.js hosting
   - Docker containerization support

### Frontend Files
- Static files can be hosted anywhere (Netlify, Vercel, S3, etc.)
- No server-side requirements
- CDN-friendly

### Configuration
Update the frontend to use your backend URL:
```javascript
// In widget files, update the API base URL if needed
const API_BASE_URL = 'https://your-backend-domain.com/api';
```

## Development

### Running Locally
1. Start backend: `cd server && npm run dev`
2. Access frontend files directly in browser
3. For development server: `npx serve .`

### Adding Features
- Widget components are in `/widget/src`
- Admin functionality is in `/admin-landing/js`
- Styles are in respective `/css` folders

## Troubleshooting

### Common Issues
- Backend not starting: Check `.env` file configuration
- Widget not loading: Verify backend is running and accessible
- Admin errors: Check browser console and API key configuration

### API Keys
- Ensure all required API keys are set in backend `.env` file
- Keys should never be exposed to frontend
- Use different keys for public and admin access
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/admin-landing/docs/API_REFERENCE.md

```
# API Reference for Admin Dashboard

## Base URL
The API endpoints are accessible through the backend proxy at `http://localhost:3001/api/`.

## Admin Endpoints

### GET `/api/admin/comments`
Fetch comments for admin review.

**Parameters:**
- `status` (string, optional): Filter by status ('pending' by default, or 'approved', 'rejected', 'spam')
- `limit` (integer, optional): Number of records (1-100, default 50)

**Headers:**
- `Authorization: Bearer <ADMIN_API_KEY>`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "thread_id": 123,
      "parent_id": null,
      "author_name": "John Doe",
      "author_email": "john@example.com",
      "message": "This is a sample comment",
      "status": "pending",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### PUT `/api/admin/comments/{id}`
Update comment status.

**Headers:**
- `Authorization: Bearer <ADMIN_API_KEY>`
- `Content-Type: application/json`

**Body:**
```json
{
  "status": "approved"  // 'approved', 'rejected', or 'spam'
}
```

**Response:**
```json
{
  "status": "success"
}
```

### POST `/api/admin/moderation-log`
Log moderation action.

**Headers:**
- `Authorization: Bearer <ADMIN_API_KEY>`
- `Content-Type: application/json`

**Body:**
```json
{
  "comment_id": 123,
  "moderator_id": 1,
  "action": "approved",  // 'approve', 'reject', 'spam', 'delete'
  "reason": "approved"
}
```

## Error Responses

Standard error response format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Authentication

All admin endpoints require admin API key in Authorization header.
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/admin-landing/docs/SETUP_GUIDE.md

```
# Setup Guide for Admin and Landing Pages

## Overview
This guide explains how to set up the lightweight admin dashboard and landing page for the Indie Comments widget.

## Prerequisites
- Backend proxy server running (e.g., at http://localhost:3001)
- Admin API key for backend authentication
- Web server to host the static files

## Installation

### 1. File Structure
Place the files in your web server directory:
```
your-web-root/
├── index.html          # Landing page
├── admin.html          # Admin dashboard
├── css/
│   ├── pico.min.css    # PicoCSS framework
│   └── custom.css      # Custom styles
├── js/
│   └── admin.js        # Admin functionality
└── docs/
    ├── API_REFERENCE.md # API documentation
    └── SETUP_GUIDE.md   # This file
```

### 2. Backend Configuration
1. Ensure your backend proxy is running at the configured URL (default: `http://localhost:3001/api`)
2. Update the `API_BASE_URL` in admin.html if needed
3. Have your admin API key ready

### 3. Admin Authentication
The admin dashboard expects the admin API key to be stored in localStorage:
```javascript
localStorage.setItem('adminApiKey', 'your-actual-admin-key');
```

In a production environment, you'd typically have a login form that authenticates the user and stores the key only after successful authentication.

### 4. Customization
- Update the landing page content to match your branding
- Modify colors in custom.css if needed
- Adjust API endpoints in admin.js if your backend URL differs

## Security Considerations
- Always use HTTPS in production
- Store the admin API key securely
- Implement proper authentication in production
- The landing page is static and can be cached aggressively
- Admin page requires authentication to access comment moderation features

## Deployment
### Static Hosting
Both pages are static HTML files that can be hosted on any static hosting service:
- Netlify, Vercel, GitHub Pages, etc.
- Traditional web servers (Apache, Nginx)

### Backend Communication
- Landing page only needs to be able to reach the backend proxy
- Admin dashboard needs to authenticate with the backend proxy
- All API keys remain server-side in the backend proxy

## Maintenance
- The static landing page requires no maintenance once deployed
- The admin dashboard has minimal JavaScript dependencies
- Updates to functionality only require updating the HTML/JS files
- Backend API changes may require updates to admin.js
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/widget/DEVELOPMENT_GUIDE.md

```
# Development Guide for Lightweight Comment Widget

## Overview
This document provides guidance for developing and maintaining the lightweight comment widget using Web Components and vanilla JavaScript.

## Project Structure
```
lightweight-comment-widget/
├── README.md                 # Project overview
├── API_REFERENCE.md          # API documentation
├── DEVELOPMENT_GUIDE.md      # This document
├── index.html               # Demo page
├── src/
│   ├── comment-widget.js    # Main web component
│   ├── comment-form.js      # Comment submission form
│   └── comment-list.js      # Comment display component
├── css/
│   ├── pico.min.css         # PicoCSS framework
│   └── widget.css           # Custom widget styles
└── dist/
    └── comment-widget.min.js # Production build
```

## Web Component Architecture

### Main Component: `<comment-widget>`
The main web component handles:
- Loading comment threads
- Managing state
- Coordinating sub-components
- API communication

### Sub-components:
- `<comment-form>` - Handles new comment submissions
- `<comment-list>` - Displays existing comments

## API Integration

### Backend Proxy
The widget communicates with the backend proxy server running at:
- Development: `http://localhost:3001/api/`
- Production: `[configured backend URL]`

### Endpoints Used
- `GET /api/comments?thread_id={id}` - Fetch comments
- `POST /api/comments` - Submit new comment
- `POST /api/threads` - Create new thread if needed

## Implementation Guidelines

### JavaScript Best Practices
- Use vanilla JavaScript without frameworks
- Implement proper error handling
- Ensure cross-browser compatibility
- Use efficient DOM manipulation
- Implement proper event handling and cleanup

### Web Components Standards
- Extend HTMLElement for custom elements
- Use Shadow DOM for encapsulation
- Implement proper lifecycle callbacks
- Use template literals for DOM creation
- Follow custom element naming conventions (hyphen required)

### Styling Guidelines
- Use PicoCSS for base styles
- Add minimal custom CSS only when necessary
- Ensure responsive design
- Maintain accessibility standards
- Use CSS custom properties for theming

## Cross-Browser Compatibility
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Include Web Components polyfill if needed for older browsers
- Test on mobile devices
- Ensure graceful degradation

## Security Considerations
- All API keys remain server-side in the proxy
- Validate all user inputs on the server
- Implement proper CORS configuration
- Use HTTPS in production

## Performance Optimization
- Minimize HTTP requests
- Implement efficient rendering
- Use event delegation where appropriate
- Implement proper caching strategies
- Keep bundle size minimal

## Markdown Support
The comment display includes basic Markdown support:
- Headers: `#`, `##`, `###`
- Bold: `**text**` or `__text__`
- Italic: `*text*` or `_text_`
- Links: `[text](url)`
- Inline code: `` `code` ``
- Code blocks: ````code````
- Unordered lists: `* item`

All Markdown-generated HTML is sanitized to prevent XSS attacks.

## Testing Checklist
- Comment loading functionality
- New comment submission
- Form validation
- Error handling
- Responsive design
- Cross-browser compatibility
- Accessibility features
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/widget/API_REFERENCE.md

```
# API Reference for Indie Comments Widget

## Base URL
The API endpoints are accessible through the backend proxy at `http://localhost:3001/api/`.

## Endpoints

### Widget Endpoints (Public)

#### GET `/api/comments`
Fetch comments for a specific thread.

**Parameters:**
- `thread_id` (integer, required): The ID of the thread to fetch comments for
- `status` (string, optional): Filter by status ('approved' by default, or 'pending')

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "thread_id": 123,
      "parent_id": null,
      "author_name": "John Doe",
      "author_email": "john@example.com",
      "author_website": "http://johndoe.com",
      "message": "This is a sample comment",
      "status": "approved",
      "spam_score": 0.1,
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### POST `/api/comments`
Submit a new comment to a thread.

**Body:**
```json
{
  "thread_id": 123,
  "author_name": "John Doe",
  "author_email": "john@example.com",
  "author_website": "http://johndoe.com",
  "message": "This is my comment",
  "parent_id": null
}
```

**Validation:**
- `thread_id` must be an integer
- `author_name` required, 1-100 characters
- `message` required, 1-10000 characters
- `author_email` optional, must be valid email
- `author_website` optional, must be valid URL
- `parent_id` optional, must be integer

**Response:**
```json
{
  "status": "success",
  "message": "Record created successfully",
  "id": 123
}
```

#### POST `/api/threads`
Create a new comment thread for a page.

**Body:**
```json
{
  "site_id": 1,
  "page_url": "https://example.com/article",
  "page_title": "My Article"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Record created successfully",
  "id": 456
}
```

### Admin Endpoints (Protected)

#### GET `/api/admin/comments`
Fetch comments for admin review.

**Parameters:**
- `status` (string, optional): Filter by status ('pending' by default)
- `limit` (integer, optional): Number of records (1-100, default 50)

#### PUT `/api/admin/comments/{id}`
Update comment status.

**Body:**
```json
{
  "status": "approved"  // 'approved', 'rejected', or 'spam'
}
```

## Error Responses

Standard error response format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Backend Proxy Configuration

The backend proxy handles all external API communications securely, protecting API keys by keeping them server-side only.
```

## /home/renato/Documentos/IndieComments/indie-comments-lightweight/README.md

```
# Indie Comments - Lightweight Version

## Overview
This is the lightweight version of the Indie Comments project, featuring:
- Lightweight comment widget using Web Components
- Static landing page
- Admin dashboard
- All features in vanilla HTML/CSS/JS with minimal dependencies

## Project Structure
```
indie-comments-lightweight/
├── README.md                 # This file
├── server/                   # Backend proxy server
│   ├── server.js            # Main server file
│   ├── package.json         # Server dependencies
│   ├── .env                 # Environment configuration
│   └── README.md            # Server documentation
├── widget/                  # Lightweight comment widget
│   ├── index.html           # Widget demo page
│   ├── src/
│   │   ├── comment-widget.js
│   │   ├── comment-form.js
│   │   └── comment-list.js
│   ├── css/
│   │   ├── pico.min.css
│   │   └── widget.css
│   └── README.md            # Widget documentation
├── admin-landing/           # Admin and landing pages
│   ├── index.html           # Landing page
│   ├── admin.html           # Admin dashboard
│   ├── css/
│   │   ├── pico.min.css
│   │   └── custom.css
│   ├── js/
│   │   └── admin.js
│   └── README.md            # Admin/landing documentation
└── docs/                    # Documentation
    ├── API_REFERENCE.md     # API documentation
    └── SETUP_GUIDE.md       # Setup instructions
```

## Quick Start

### 1. Backend Setup
```bash
cd server
npm install
npm run dev  # Runs on http://localhost:3001
```

### 2. Frontend Usage
- Widget: Open `widget/index.html` in browser
- Landing: Open `admin-landing/index.html` in browser  
- Admin: Open `admin-landing/admin.html` in browser

## Features
- Lightweight (under 10KB total)
- No external dependencies
- Web Components architecture
- Markdown support
- Responsive design
- Secure API communication
```