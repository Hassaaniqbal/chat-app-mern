import React, { useState, useEffect } from 'react';
import { Layout, Input, Avatar, List, Form, Button } from 'antd';
import { SearchOutlined, SendOutlined, ArrowLeftOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Track selected chat
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768); // Mobile view state

  // Listen for window resize to switch between mobile and desktop view
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chatList = [
    {
      name: 'Hassaan',
      avatar: 'https://placehold.co/32x32',
      lastMessage: 'Hello how are you',
    },
    // Add more chat entries here
  ];

  // Function to handle chat selection
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  // Function to go back to chat list (for mobile)
  const handleBackToChatList = () => {
    setSelectedChat(null); // Go back to chat list
  };

  // Function to handle logout
  const handleLogout = () => {
    console.log('Logout clicked'); // Implement your logout logic here
  };

  return (
    <div
      style={{
        height: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      {/* Chat Container */}
      <div
        style={{
          width: isMobileView ? '100%' : '800px', // Fixed width for desktop, full width for mobile
          height: isMobileView ? '100%' : '600px', // Fixed height for desktop, full height for mobile
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Sidebar: Chat List */}
        {!selectedChat || !isMobileView ? (
          <Sider
            width={isMobileView ? '100%' : 250} // Full width on mobile, fixed width on desktop
            style={{
              backgroundColor: '#f0f2f5',
              height: '100%',
              overflowY: 'auto',
              display: isMobileView && selectedChat ? 'none' : 'block', // Hide sidebar on mobile when chat is open
            }}
          >
            {/* Display logged-in user name and logout button (visible on both mobile and desktop) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <span>Logged in as: John Doe</span>
              <Button
                type="link"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ padding: 0 }}
              >
                Logout
              </Button>
            </div>

            {/* Search Bar */}
            <div style={{ padding: '16px' }}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search..."
                style={{ borderRadius: '20px', width: '100%' }}
              />
            </div>

            {/* Chat List */}
            <List
              itemLayout="horizontal"
              dataSource={chatList}
              renderItem={(item) => (
                <List.Item
                  style={{ cursor: 'pointer', padding: '10px 20px' }}
                  onClick={() => handleChatClick(item)}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<span>{item.name}</span>}
                    description={item.lastMessage}
                  />
                </List.Item>
              )}
            />
          </Sider>
        ) : null}

        {/* Chat Window */}
        {(selectedChat || !isMobileView) && (
          <Layout style={{ flexGrow: 1 }}>
            {/* Header: Chat with User */}
            <Header
              style={{
                backgroundColor: '#fff',
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                borderBottom: '1px solid #e8e8e8',
              }}
            >
              {isMobileView && selectedChat && (
                <ArrowLeftOutlined
                  onClick={handleBackToChatList}
                  style={{ marginRight: '16px', cursor: 'pointer' }}
                />
              )}
              To: {selectedChat ? selectedChat.name : 'Select a chat'}
            </Header>

            {/* Chat Messages */}
            <Content
              style={{
                padding: '16px',
                backgroundColor: '#fff',
                overflowY: 'auto',
                flexGrow: 1,
                height: 'calc(100vh - 128px)', // Ensuring content fits within the height
              }}
            >
              {selectedChat ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Received Message */}
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar src="https://placehold.co/32x32" />
                    <div
                      style={{
                        marginLeft: '10px',
                        maxWidth: '60%',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        backgroundColor: '#f1f1f1',
                      }}
                    >
                      <div style={{ fontSize: '14px' }}>Hello, how are you?</div>
                      <div style={{ fontSize: '12px', color: 'gray', textAlign: 'right' }}>18:01</div>
                    </div>
                  </div>

                  {/* Sent Message */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <div
                      style={{
                        maxWidth: '60%',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        backgroundColor: '#1890ff',
                        color: '#fff',
                        marginRight: '10px',
                      }}
                    >
                      <div style={{ fontSize: '14px' }}>I'm fine, how are you?</div>
                      <div style={{ fontSize: '12px', color: 'lightgray', textAlign: 'right' }}>18:01</div>
                    </div>
                    <Avatar src="https://placehold.co/32x32" />
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', marginTop: '50%' }}>
                  Please select a chat to start messaging
                </div>
              )}
            </Content>

            {/* Message Input */}
            {selectedChat && (
              <Footer
                style={{
                  backgroundColor: '#fff',
                  padding: '16px',
                  borderTop: '1px solid #e8e8e8',
                }}
              >
                <Form style={{ display: 'flex', width: '100%' }}>
                  <Form.Item style={{ flexGrow: 1, marginRight: '8px' }}>
                    <Input placeholder="Send a message..." />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" icon={<SendOutlined />} />
                  </Form.Item>
                </Form>
              </Footer>
            )}
          </Layout>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
