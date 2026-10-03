---
title: Encoder-decoder models
description: >-
  Encoder decoder is a deep neural network architecture that consists of 2 components: - Encoder: input -> encoder
  memory (real-valued vector), - Decoder: encoder memory -> output. Input is variable length, encoder memory is fixed
  length.
date: 2022-06-22
kind: stream
---

Encoder decoder is a deep neural network architecture that consists of 2 components:

- Encoder: input -> encoder memory (real-valued vector),
- Decoder: encoder memory -> output.

Input is variable length, encoder memory is fixed length.

<figure>
  <img src="/images/encoder-decoder-diagram.webp" alt="Encoder-decoder architecture: the encoder converts input into a memory representation that the decoder uses to produce output." />
  <figcaption>Source: <a href="https://d2l.ai/chapter_recurrent-modern/encoder-decoder.html">Dive into Deep Learning — Encoder-Decoder Architecture</a>.</figcaption>
</figure>

The encoder and decoder portions can be swapped out.
Sometimes the encoder is initialized with pretrained weights, for example in [CodeBERT](https://github.com/guoday/CodeBERT/blob/master/CodeBERT/code2nl/run.py#L257-L263).

They are often used for Seq2seq tasks such as Neural Machine Translation (NMT).
