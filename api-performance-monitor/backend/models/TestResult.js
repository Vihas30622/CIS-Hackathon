const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema(
  {
    apiUrl: {
      type: String,
      required: true,
      trim: true
    },
    httpMethod: {
      type: String,
      enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      required: true
    },
    requestHeaders: {
      type: Object,
      default: {}
    },
    requestBody: {
      type: Object,
      default: null
    },
    responseStatus: {
      type: Number,
      required: true
    },
    responseData: {
      type: Object,
      default: null
    },
    responseTime: {
      type: Number,
      required: true,
      description: 'Response time in milliseconds'
    },
    isSlowAPI: {
      type: Boolean,
      default: false
    },
    slowThreshold: {
      type: Number,
      default: 2000
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { timestamps: true }
);

// Index for faster queries
testResultSchema.index({ apiUrl: 1, timestamp: -1 });
testResultSchema.index({ responseTime: -1 });
testResultSchema.index({ isSlowAPI: 1 });

module.exports = mongoose.model('TestResult', testResultSchema);
