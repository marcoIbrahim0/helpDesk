const livechatModel = require("../Models/livechat");
const secretKey =process.env.SECRET_KEY ;
const bcrypt = require("bcrypt");

const encryptMessage = require('../Middleware/encryptionMiddleware.js');
const decryptMessage = require('../Middleware/decryptMiddleware.js');




// // const livechatController = {
// //     getAllChat : async (req, res) => {
// //   try {
// //     const chatId = req.params.id;

// //     const chatEntry = await livechatModel.findById(chatId, { _id: 0, __v: 0 }); // Exclude _id and __v fields

// //     if (!chatEntry) {
// //       return res.status(404).json({ message: "Chat not found" });
// //     }

// //     return res.status(200).json([chatEntry]); // Return as an array for consistency
// //   } catch (error) {
// //     console.error("Error retrieving chat:", error);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // },

// const livechatController = {
//     getAllChat: async (req, res) => {
//         try {
//           const chatId = req.params.id;
    
//           const chatEntry = await livechatModel.findById(chatId, { _id: 0, __v: 0 }); // Exclude _id and __v fields
    
//           if (!chatEntry) {
//             return res.status(404).json({ message: "Chat not found" });
//           }
    
//           // Decrypt and update newQuestion array
//           if (chatEntry.newQuestion && chatEntry.newQuestion.length > 0) {
//             chatEntry.newQuestion.forEach((entry) => {
//               entry.decryptedMessage = decryptMessage(entry.encryptedMessage, entry.key, entry.iv);
//             });
//           }
    
//           // Decrypt and update answer array
//           if (chatEntry.answer && chatEntry.answer.length > 0) {
//             chatEntry.answer.forEach((entry) => {
//               entry.decryptedMessage = decryptMessage(entry.encryptedMessage, entry.key, entry.iv);
//             });
//           }
    
//           return res.status(200).json(chatEntry);
//         } catch (error) {
//           console.error("Error retrieving chat:", error);
//           return res.status(500).json({ message: "Server error" });
//         }
//       },
const livechatController = {
    getAllChat: async (req, res) => {
      try {
        const chatId = req.params.id;
  
        const chatEntry = await livechatModel.findById(chatId, { _id: 0, __v: 0 }); // Exclude _id and __v fields
  
        if (!chatEntry) {
          return res.status(404).json({ message: "Chat not found" });
        }
  
        // Create a new array for response without key and iv
        const decryptedChatEntry = [];
  
        // Interleave decrypted messages from questions and answers
        for (let i = 0; i < Math.max(chatEntry.newQuestion.length, chatEntry.answer.length); i++) {
          if (i < chatEntry.newQuestion.length) {
            decryptedChatEntry.push({
              role: 'question',
              decryptedMessage: chatEntry.newQuestion[i].encryptedMessage && chatEntry.newQuestion[i].key && chatEntry.newQuestion[i].iv
                ? decryptMessage(chatEntry.newQuestion[i].encryptedMessage, chatEntry.newQuestion[i].key, chatEntry.newQuestion[i].iv)
                : "Decryption failed due to missing values",
            });
          }
  
          if (i < chatEntry.answer.length) {
            decryptedChatEntry.push({
              role: 'answer',
              decryptedMessage: chatEntry.answer[i].encryptedMessage && chatEntry.answer[i].key && chatEntry.answer[i].iv
                ? decryptMessage(chatEntry.answer[i].encryptedMessage, chatEntry.answer[i].key, chatEntry.answer[i].iv)
                : "Decryption failed due to missing values",
            });
          }
        }
  
        return res.status(200).json(decryptedChatEntry);
      } catch (error) {
        console.error("Error retrieving chat:", error);
        return res.status(500).json({ message: "Server error" });
      }
    },
  
  
  
  
  
  
//  getAllChat: async (req, res) => {
//     try {
//       const chatId = req.params.id;

//       const chatEntry = await livechatModel.findById(chatId, { _id: 0, __v: 0 }); // Exclude _id and __v fields

//       if (!chatEntry) {
//         return res.status(404).json({ message: "Chat not found" });
//       }

//       // Assuming the encrypted message is stored in chatEntry.newQuestion[0]
//       const decryptedMessage = decryptMessage(chatEntry.newQuestion[0].encryptedMessage, chatEntry.newQuestion[0].key, chatEntry.newQuestion[0].iv);

//       // Update the chatEntry with the decrypted message
//       chatEntry.newQuestion[0].decryptedMessage = decryptedMessage;

//       return res.status(200).json([chatEntry]); // Return as an array for consistency
//     } catch (error) {
//       console.error("Error retrieving chat:", error);
//       return res.status(500).json({ message: "Server error" });
//     }
//   },

 createQuestion : async (req, res) => {
    try {
      // Encrypt the question using a simple encryption algorithm (e.g., AES)
      const encryptedQuestion = encryptMessage(req.body.question);
  
      const question = new livechatModel({
        newQuestion: [encryptedQuestion],
      });
  
      const newQuestion = await question.save();
      const questionId = newQuestion._id;
      
      
      return res.status(201).json({newQuestion,questionId});
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },
    
//     //   createQuestion: async (req, res) => {
//     //     const question = new livechatModel({
//     //         newQuestion: [req.body.question],          
//     //     });
//     //     try {
//     //       const newQuestion = await question.save();
//     //       return res.status(201).json(newQuestion);
//     //     } catch (e) {
//     //       return res.status(400).json({ message: e.message });
//     //     }
//     //   },
//     //   updateAnswer: async (req, res) => {
//     //     const answer = new livechatModel({
//     //       answer: req.body.answer,
//     //     });
//     //     try {
//     //       const newAnswer = await answer.save();
//     //       return res.status(201).json(newAnswer);
//     //     } catch (e) {
//     //       return res.status(400).json({ message: e.message });
//     //     }
//     //   },
//     //  updateAnswer : async (req, res) => {
//     //     try {
//     //       const questionId = req.params.id;
      
//     //       const newAnswer = req.body.newAnswer;
      
//     //     //   // Check if the user is an agent
//     //     //   if (req.user.role !== 'agent') {
//     //     //     return res.status(403).json({ message: "Permission denied" });
//     //     //   }
      
//     //       // Find the question by ID
//     //       const question = await livechatModel.findById(questionId);
      
//     //       if (!question) {
//     //         return res.status(404).json({ message: "Question not found" });
//     //       }
      
//     //       // Update the answer
//     //       question.answer = question.answer || []; // Ensure answer is initialized as an array
//     //       question.answer.push(newAnswer);
//     //       await question.save();
      
//     //       res.status(200).json({ message: "Answer updated successfully", question });
//     //     } catch (error) {
//     //       console.error("Error updating answer:", error);
//     //       res.status(500).json({ message: "Server error" });
//     //     }
//     //   },
    updateAnswer: async (req, res) => {
        try {
          const questionId = req.params.id;
    
          const newAnswer = req.body.newAnswer;
          
          // Find the question by ID
          const question = await livechatModel.findById(questionId);
    
          if (!question) {
            return res.status(404).json({ message: "Question not found" });
          }
    
          // Encrypt the new answer using the encryption middleware
          const encryptedAnswer = encryptMessage(newAnswer);
    
          // Update the answer
          question.answer = question.answer || []; // Ensure answer is initialized as an array
          question.answer.push({
            encryptedMessage: encryptedAnswer.encryptedMessage,
            key: encryptedAnswer.key,
            iv: encryptedAnswer.iv,
          });
    
          await question.save();
    
          res.status(200).json({ message: "Answer updated successfully", question });
        } catch (error) {
          console.error("Error updating answer:", error);
          res.status(500).json({ message: "Server error" });
        }
      },
    


      updateQuestion: async (req, res) => {
        try {
          const questionId = req.params.id;
          const newQuestion = req.body.newQuestion;
    
          // Find the question by ID
          const question = await livechatModel.findById(questionId);
    
          if (!question) {
            return res.status(404).json({ message: "Question not found" });
          }
    
          // Encrypt the new question using the encryption middleware
          const encryptedQuestion = encryptMessage(newQuestion);
    
          // Update the question
          question.newQuestion = question.newQuestion || []; // Ensure newQuestion is initialized as an array
          question.newQuestion.push({
            encryptedMessage: encryptedQuestion.encryptedMessage,
            key: encryptedQuestion.key,
            iv: encryptedQuestion.iv,
          });
    
          await question.save();
    
          res.status(200).json({ message: "Question updated successfully", question });
        } catch (error) {
          console.error("Error updating question:", error);
          res.status(500).json({ message: "Server error" });
        }
      },
//     //   updateQuestion : async (req, res) => {
//     //     try {
//     //       const questionId = req.params.id;
      
//     //       const newQuestion = req.body.newQuestion;
      
//     //     //   // Check if the user is an agent
//     //     //   if (req.user.role !== 'agent') {
//     //     //     return res.status(403).json({ message: "Permission denied" });
//     //     //   }
      
//     //       // Find the question by ID
//     //       const question = await livechatModel.findById(questionId);
      
//     //       if (!question) {
//     //         return res.status(404).json({ message: "Question not found" });
//     //       }
      
//     //       // Update the question
//     //       question.newQuestion= question.newQuestion || []; // Ensure answer is initialized as an array
//     //       question.newQuestion.push(newQuestion);
//     //       await question.save();
      
//     //       res.status(200).json({ message: "question updated successfully", question });
//     //     } catch (error) {
//     //       console.error("Error updating answer:", error);
//     //       res.status(500).json({ message: "Server error" });
//     //     }
//     //   },

      getLatestAnswer: async (req, res) => {
       try {
        const chatId = req.params.id;

        const chatEntry = await livechatModel.findById(chatId, { _id: 0, __v: 0 }); // Exclude _id and __v fields

      if (!chatEntry) {
        return res.status(404).json({ message: "Chat not found" });
      }

      // Get the latest answer
      const latestAnswer = chatEntry.answer[chatEntry.answer.length - 1];

      if (!latestAnswer) {
        return res.status(404).json({ message: "No answers found" });
      }

      // Decrypt and send the latest answer
      const decryptedAnswer = {
        role: 'answer',
        decryptedMessage: latestAnswer.encryptedMessage && latestAnswer.key && latestAnswer.iv
          ? decryptMessage(latestAnswer.encryptedMessage, latestAnswer.key, latestAnswer.iv)
          : "Decryption failed due to missing values",
      };

      return res.status(200).json(decryptedAnswer);
    } catch (error) {
      console.error("Error retrieving latest answer:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  getLatestQuestion: async (req, res) => {
    try {
      const chatId = req.params.id;

      const chatEntry = await livechatModel.findById(chatId, { _id: 0, __v: 0 }); // Exclude _id and __v fields

      if (!chatEntry) {
        return res.status(404).json({ message: "Chat not found" });
      }

      // Get the latest question
      const latestQuestion = chatEntry.newQuestion[chatEntry.newQuestion.length - 1];

      if (!latestQuestion) {
        return res.status(404).json({ message: "No questions found" });
      }

      // Decrypt and send the latest question
      const decryptedQuestion = {
        role: 'question',
        decryptedMessage: latestQuestion.encryptedMessage && latestQuestion.key && latestQuestion.iv
          ? decryptMessage(latestQuestion.encryptedMessage, latestQuestion.key, latestQuestion.iv)
          : "Decryption failed due to missing values",
      };

      return res.status(200).json(decryptedQuestion);
    } catch (error) {
      console.error("Error retrieving latest question:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },
   
 getChats : async (req, res) => {
  try {
    const chats = await livechatModel.find();
    const chatMessages = chats.map(chat => ({
      chatId: chat._id,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      questions: chat.newQuestion.map(question => ({
        decryptedQuestion: decryptMessage(question.encryptedMessage, question.key, question.iv),
      })),
      answers: chat.answer.map(answer => ({
        decryptedAnswer: decryptMessage(answer.encryptedMessage, answer.key, answer.iv),
      })),
    }));

    return res.status(200).json(chatMessages);
  } catch (e) {
    return res.status(500).json({ message: "a7a" });
  }
},

    };

    

      

    
      module.exports = livechatController;