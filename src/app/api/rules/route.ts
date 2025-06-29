import { NextRequest, NextResponse } from 'next/server';
import { callAI, getNLPRuleConversionPrompt } from '@/lib/ai/aiService';
import { Rule } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { nlpText, action } = await req.json();

    if (action === 'convert' && nlpText) {
      const prompt = getNLPRuleConversionPrompt(nlpText);
      const aiResponse = await callAI(prompt, { nlpText }); // Pass context for mock AI
      
      if (aiResponse.success && aiResponse.data) {
        return NextResponse.json(aiResponse.data as Rule, { status: 200 });
      } else {
        return NextResponse.json({ error: aiResponse.error || 'AI could not convert NLP to rule.' }, { status: 400 });
      }
    }

    // TODO: Add other rule-related AI actions like 'suggest'

    return NextResponse.json({ error: 'Invalid action or missing parameters.' }, { status: 400 });
  } catch (error) {
    console.error('Rules API error:', error);
    return NextResponse.json({ error: (error as Error).message || 'Failed to process rule request.' }, { status: 500 });
  }
}

