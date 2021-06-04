const express = require('express');
const { google } = require('googleapis');

// 環境変数を使用
require('dotenv').config();
const env = process.env;

// APIキーを設定
const { YOUTUBE_API_KEY } = env;

