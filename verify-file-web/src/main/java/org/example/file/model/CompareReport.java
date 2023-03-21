package org.example.file.model;


public class CompareReport {
	private Article a1;
	private Article a2;

	private int top;

	private double similarity;

	public CompareReport(Article a1, Article a2, int top, double similarity) {
		this.a1 = a1;
		this.a2 = a2;
		this.top = top;
		this.similarity = similarity;
	}

	@Override
	public String toString() {
		return String.format("%s和%s 相似度：%.0f%%", a1.getName(), a2.getName(), similarity*100);
	}

	/**
	 * 相似比率
	 * @return
	 */
	public int getDetail() {
		return (int) (similarity*100);
	}
}
