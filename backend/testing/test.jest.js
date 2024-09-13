describe("newGroupChat", () => {
    it("should create a new group chat", async () => {
      const req = {
        body: {
          chatName: "Test Group Chat",
          members: ["user1", "user2", "user3"],
          file: Buffer.from("test file"),
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await newGroupChat(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        message: "group chat created successfully",
        success: true,
      });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  
    it("should return an error if chatName is missing", async () => {
      const req = {
        body: {
          members: ["user1", "user2", "user3"],
          file: Buffer.from("test file"),
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await newGroupChat(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        message: "please enter all fields",
        success: false,
      });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });


  describe("requestSend", () => {
    it("should create a new request", async () => {
      const req = {
        body: {
          sender: "user1",
          receiver: "user2",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await requestSend(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "request created successfully",
      });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  
    it("should return an error if sender is missing", async () => {
      const req = {
        body: {
          receiver: "user2",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await requestSend(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        message: "please enter both sender and receiver",
        success: false,
      });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("Requests", () => {
    it("should get requests for a user", async () => {
      const req = {
        body: {
          id: "user1",
        },
      };
      const res = {
        json: jest.fn(),
      };
      await Requests(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        requests: expect.any(Array),
      });
    });
  
    it("should return an error if id is missing", async () => {
      const req = {
        body: {},
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await Requests(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        message: "please login first",
        success: false,
      });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });



describe('sendMessage', () => {
  it('should send a message successfully', async () => {
    const req = {
      params: { chatId: '123' },
      body: { message: 'Hello', senderId: '123', receiverId: '456' }
    };
    const res = { json: jest.fn() };
    await sendMessage(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: expect.any(Object) });
  });

  it('should return an error if chatId is not provided', async () => {
    const req = { params: {} };
    const res = { json: jest.fn() };
    await sendMessage(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'please provide chatId' });
  });
});



describe('sendAttachment', () => {
  it('should send an attachment successfully', async () => {
    const req = {
      params: { chatId: '123' },
      body: { file: 'file buffer', senderId: '123', receiverId: '456' }
    };
    const res = { json: jest.fn() };
    await sendAttachment(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: expect.any(Object) });
  });

  it('should return an error if chatId is not provided', async () => {
    const req = { params: {} };
    const res = { json: jest.fn() };
    await sendAttachment(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'please provide chatId' });
  });
});


describe('getChat', () => {
  it('should get a chat successfully', async () => {
    const req = { body: { chatId: '123' } };
    const res = { json: jest.fn() };
    await getChat(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, chat: expect.any(Object) });
  });

  it('should return an error if chatId is not provided', async () => {
    const req = { body: {} };
    const res = { json: jest.fn() };
    await getChat(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'please provide chatId' });
  });
});



describe('getAllChats', () => {
  it('should get all chats successfully', async () => {
    const req = { body: { id: '123' } };
    const res = { json: jest.fn() };
    await getAllChats(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, allChats: expect.any(Array) });
  });

  it('should return an error if id is not provided', async () => {
    const req = { body: {} };
    const res = { json: jest.fn() };
    await getAllChats(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'please login first' });
  });
});



describe('getAllMessages', () => {
  it('should get all messages successfully', async () => {
    const req = { params: { chatId: '123' }, body: { id: '123' } };
    const res = { json: jest.fn() };
    await getAllMessages(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, allMessages: expect.any(Array) });
  });

  it('should return an error if chatId is not provided', async () => {
    const req = { params: {} };
    const res = { json: jest.fn() };
    await getAllMessages(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'please provide chatId' });
  });
});



describe('deleteMessage', () => {
  it('should delete a message successfully', async () => {
    const req = { params: { chatId: '123', messageId: '123' }, body: { id: '123' } };
    const res = { json: jest.fn() };
    await deleteMessage(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "message deleted successfully" });
  });

  it('should return an error if chatId is not provided', async () => {
    const req = { params: {} };
    const res = { json: jest.fn() };
    await deleteMessage(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'please provide chatId' });
  });
});




describe('updateMessage', () => {
  it('should update a message successfully', async () => {
    const req = { params: { chatId: '123', messageId: '123' }, body: { id: '123', message: 'Hello' } };
    const res = { json: jest.fn() };
    await updateMessage(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "message updated successfully" });
  });

  it('should return an error if chatId is not provided', async () => {
    const req = { params: {} };
    const res = { json: jest.fn() };
    await updateMessage(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'please provide chatId' });
  });
});




describe('deleteChat', () => {
  it('should delete a chat successfully', async () => {
    const req = { params: { chatId: '123' }, body: { id: '123' } };
    const res = { json: jest.fn() };
    await deleteChat(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "chat deleted successfully" });
  });

  it('should return an error if chatId is not provided', async () => {
    const req = { params: {} };
    const res = { json: jest.fn() };
    await deleteChat(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'please provide chatId' });
  });
});