import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import * as GameLogic from './gameLogic.js';

// ... existing file stays the same ...

  /** Create a new game room as the host */
  socket.on('createGame', ({ playerName, isExtended = false, enableSpecialBuild = true, expansions = [] }, callback) => {
    // Check game limit
    if (games.size >= MAX_CONCURRENT_GAMES) {
      callback({ 
        success: false, 
        error: 'Server has reached maximum number of games. Please try again later.' 
      });
      return;
    }
    
    const gameCode = generateGameCode();
    const playerId = uuidv4();
    
    const game = GameLogic.createGame(gameCode, {
      id: playerId,
      name: playerName
    }, isExtended, enableSpecialBuild, expansions);
    
    // Add timestamp for cleanup
    game.createdAt = Date.now();
    
    games.set(gameCode, game);
    playerSockets.set(socket.id, { gameId: gameCode, playerId });
    socket.join(gameCode);
    
    console.log(`Game ${gameCode} created by ${playerName}`);
    
    callback({
      success: true,
      gameCode,
      playerId,
      gameState: GameLogic.getPlayerView(game, playerId)
    });
  });
